# -*- coding: utf-8 -*-
#
# Copyright 2016 VNG Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
from helpers import LuigiTestCase, RunOnceTask

import luigi
import luigi.task
from luigi.util import requires


class BasicsTest(LuigiTestCase):

    def test_task_ids_using_requries(self):
        class ParentTask(luigi.Task):
            my_param = luigi.Parameter()
        luigi.namespace('blah')

        @requires(ParentTask)
        class ChildTask(luigi.Task):
            pass
        luigi.namespace('')
        child_task = ChildTask(my_param='hello')
        self.assertEqual(str(child_task), 'blah.ChildTask(my_param=hello)')
        self.assertIn(ParentTask(my_param='hello'), luigi.task.flatten(child_task.requires()))

    def test_task_ids_using_requries_2(self):
        # Here we use this decorator in a unnormal way.
        # But it should still work.
        class ParentTask(luigi.Task):
            my_param = luigi.Parameter()
        decorator = requires(ParentTask)
        luigi.namespace('blah')

        class ChildTask(luigi.Task):
            pass
        luigi.namespace('')
        ChildTask = decorator(ChildTask)
        child_task = ChildTask(my_param='hello')
        self.assertEqual(str(child_task), 'blah.ChildTask(my_param=hello)')
        self.assertIn(ParentTask(my_param='hello'), luigi.task.flatten(child_task.requires()))

    def _setup_parent_and_child(self):
        class ParentTask(luigi.Task):
            my_parameter = luigi.Parameter()
            class_variable = 'notset'

            def run(self):
                self.__class__.class_variable = self.my_parameter

            def complete(self):
                return self.class_variable == 'actuallyset'

        @requires(ParentTask)
        class ChildTask(RunOnceTask):
            pass

        return ParentTask

    def test_requires_has_effect_run_child(self):
        ParentTask = self._setup_parent_and_child()
        self.assertTrue(self.run_locally_split('ChildTask --my-parameter actuallyset'))
        self.assertEqual(ParentTask.class_variable, 'actuallyset')

    def test_requires_has_effect_run_parent(self):
        ParentTask = self._setup_parent_and_child()
        self.assertTrue(self.run_locally_split('ParentTask --my-parameter actuallyset'))
        self.assertEqual(ParentTask.class_variable, 'actuallyset')
