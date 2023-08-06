import json
import logging
from pipelines.plugins.stdout_logger import StdoutLogger
from pipelines.plugins.status_logger import StatusLogger
from pipelines.plugin.exceptions import PluginError

RETRY_COUNT = 2

log = logging.getLogger('pipelines')

class FileLogger(StdoutLogger):

    def __init__(self, file_path):
        super(FileLogger, self).__init__()

        self.write_on = ['on_pipeline_finish']

        self.file_path = file_path

    @classmethod
    def from_dict(cls, conf_dict, event_mgr=None):
        if 'status_file' not in conf_dict:
            raise PluginError('File logger is missing status_file'
                              'configuration parameter')

        if not isinstance(conf_dict['status_file'], basestring):
            raise PluginError('File logger has invalid status_file parameter')

        return StatusLogger(conf_dict['status_file'])

    def write(self, msg):
        with open(self.file_path) as f:
            f.write(json.dump({
                'status': 'success'
            }, indent=2))
