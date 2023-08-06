import json


from django.test import TestCase


from squad.core import models
from squad.core.comparison import TestComparison
from squad.core.tasks import ReceiveTestRun


def compare(b1, b2):
    return TestComparison.compare_builds(b1, b2)


class TestComparisonTest(TestCase):

    def receive_build(self, project, version, env, tests):
        receive = ReceiveTestRun(project)
        receive(version, env, tests_file=json.dumps(tests))

    def setUp(self):
        self.group = models.Group.objects.create(slug='mygruop')
        self.project1 = self.group.projects.create(slug='project1')
        self.project2 = self.group.projects.create(slug='project2')

        self.receive_build(self.project1, '1', 'myenv', {
            'a': 'pass',
            'b': 'pass',
            'c': 'fail',
            'd/e': 'pass',
        })
        self.receive_build(self.project2, '1', 'myenv', {
            'a': 'fail',
            'b': 'pass',
            'c': 'pass',
            'd/e': 'pass',
        })

        self.build1 = self.project1.builds.last()
        self.build2 = self.project2.builds.last()

    def test_builds(self):
        comp = compare(self.build1, self.build2)
        self.assertEqual([self.build1, self.build2], comp.builds)

    def test_test_runs(self):
        comp = compare(self.build1, self.build2)

        t1 = self.project1.builds.last().test_runs.last()
        t2 = self.project2.builds.last().test_runs.last()

        self.assertEqual([t1], comp.test_runs[self.build1])
        self.assertEqual([t2], comp.test_runs[self.build2])

    def test_tests(self):
        comp = compare(self.build1, self.build2)
        self.assertEqual(['a', 'b', 'c', 'd/e'], sorted(comp.results.keys()))

    def test_test_results(self):
        comp = compare(self.build1, self.build2)

        t1 = self.project1.builds.last().test_runs.last()
        t2 = self.project2.builds.last().test_runs.last()

        self.assertEqual('pass', comp.results['a'][t1])
        self.assertEqual('fail', comp.results['c'][t1])

        self.assertEqual('fail', comp.results['a'][t2])
        self.assertEqual('pass', comp.results['b'][t2])

    def test_compare_projects(self):
        comp = TestComparison.compare_projects(self.project1, self.project2)
        self.assertEqual([self.build1, self.build2], comp.builds)
