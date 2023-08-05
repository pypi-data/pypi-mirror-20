import json
import logging
from datetime import datetime

from pipelines.plugin.base_plugin import BasePlugin

log = logging.getLogger('pipelines')


class StdoutLogger(BasePlugin):
    hook_prefix = ''
    hooks = (
        'on_pipeline_start',
        'on_task_start',
        'on_task_finish',
        'on_pipeline_finish',
        'on_task_event'
    )

    write_on = ['on_pipeline_start',
                'on_pipeline_finish',
                'on_task_start',
                'on_task_output',
                'on_task_finish',
                'on_task_event']

    timestamp_format = '%Y:%m:%d %H:%M:%S'
    log_format = '{timestamp}: {message}'

    log_file=None

    def __init__(self, log_file=None):
        self.stats = {
            'start': None,
            'finish': None,
            'tasks': []
        }
        self.log_file = log_file

    @classmethod
    def from_dict(cls, conf_dict, event_mgr=None):
        if 'log_file' in conf_dict:
            log.debug('Found Log File for stdout logger: %s' % conf_dict['log_file'])
        else:
            log.debug('No Log File for stdout logger')
        return cls(conf_dict.get('log_file'))

    def on_pipeline_start(self, pipeline_context, *args):
        self._add_pipeline_start_stats()

        if 'on_pipeline_start' in self.write_on:
            self.write('Pipeline started. vars: %s' % json.dumps(pipeline_context.toDict().get('vars', 'None')))

    def on_pipeline_finish(self, *args):
        self._add_pipeline_finish_stats()

        msg = self._generate_report(self)

        if 'on_pipeline_finish' in self.write_on:
            self.write(msg)

    def on_task_event(self, event_dict):
        log.debug('on_task_event: %s' % (event_dict))
        if event_dict.get('output'):
            if 'on_task_event' in self.write_on:
                log.debug('2')
                self.write(event_dict.get('output'))

    def on_task_start(self, task):
        self._add_task_start_stats(task)

        if 'on_task_start' in self.write_on:
            msg = 'Task started: {task_name}'.format(task_name=task.name)
            self.write(msg)

    def on_task_finish(self, task, result):
        self._add_task_finish_stats(result)

        if 'on_task_finish' in self.write_on:
            msg = (
                'Task finished, name: {task_name}, status: {task_status}, '
                'msg: {message}'
            ).format(
                task_name = task.name,
                task_status = result.status,
                message=result.message
            )

            self.write(msg)

    def write(self, msg):
        now_str = self._timestamp(datetime.now())

        to_write = self.log_format.format(timestamp=now_str,
                                          message=msg)
        if self.log_file:
            with open(self.log_file, 'a') as f:
                f.write(to_write)
                f.write('\n')
        else:
            print(to_write)

    def _add_task_start_stats(self, task):
        now = datetime.now()

        self.stats['tasks'].append({
            'start': now,
            'task': task
        })

    def _add_task_finish_stats(self, result):
        now = datetime.now()
        task_stat = self.stats['tasks'][-1]
        task_stat.update({
            'end': now,
            'duration': now - task_stat['start'],
            'result': result
        })

    def _add_pipeline_start_stats(self):
        self.stats['start'] = datetime.now()

    def _add_pipeline_finish_stats(self):
        now = datetime.now()
        self.stats['finish'] = now
        self.stats['duration'] = now - self.stats['start']


    def _generate_report(self, msg_format):
        fail_count = len(filter(lambda task: not task['result'].is_successful(),
                                self.stats['tasks']))

        return 'Pipeline finished. Duration: {duration}, {fail_count} failed tasks'.format(
            duration=self._duration_str(self.stats['duration']),
            fail_count= fail_count
        )

    def _timestamp(self, date_obj):
        return date_obj.strftime(self.timestamp_format)

    def _duration_str(self, duration):
        total_seconds = duration.total_seconds()
        hours, rest = divmod(total_seconds, 60 * 60)
        minutes, seconds = divmod(rest, 60)
        ret = ''
        if hours:
            ret += '{}h '.format(hours)
        if hours or minutes:
            ret += '{}m '.format(minutes)
        ret += '{}s'.format(round(seconds, 2))

        return ret

