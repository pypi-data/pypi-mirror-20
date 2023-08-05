import flask
import nbserve
import os
from glob import glob
import jupyter_client

flask_app = flask.Flask(nbserve.__progname__)
#flask_app.config['DEBUG'] = True

#############
# Initialize some Jupyter and RunIPy services.
from traitlets.config import Config
from nbconvert.exporters.html import HTMLExporter
from nbformat import convert, current_nbformat, reads # write, NBFormatError

try:
    from jupyter.html.services.notebooks.filenbmanager import FileNotebookManager
    nbmanager = FileNotebookManager(notebook_dir='.')
except ImportError:
    # 'Notebook Manager' doesn't seem to exist in newer versions of IPython / Jupyter, so
    #   I reimplemented the functionality we need here (rather than change a bunch of the existing code).
    class MockNotebookManager:
        def __init__(self):
            self.notebook_dir = os.path.abspath('.')

        def list_notebooks(self, path=''):
            return [{'name':os.path.split(p)[-1]} for p in glob(os.path.join(self.notebook_dir, path, '*.ipynb'))]

        def notebook_exists(self, nbname):
            return os.path.exists(os.path.join(self.notebook_dir, nbname))

        def get_notebook(self, nbname):
            with open(os.path.join(self.notebook_dir, nbname), 'r') as f:
                nb = f.read()
                return reads(nb, 3)


    nbmanager = MockNotebookManager()

##
# This thread initializes a notebook runner, so that it's
# ready to go on first page access.
runner = None
import threading
import jupyter_client
import runipy.notebook_runner

def make_notebook_runner():
    global runner
    from runipy.notebook_runner import NotebookRunner
    runner = NotebookRunner(None)
    print "Runner is ready."
make_notebook_runner_thread = threading.Thread(target=make_notebook_runner)
make_notebook_runner_thread.start()

from runipy.notebook_runner import NotebookRunner

runner = NotebookRunner(None)
runner = runipy.notebook_runner.NotebookRunner(None)


def update_config(new_config):
    """ Update config options with the provided dictionary of options.
    """
    flask_app.base_config.update(new_config)

    # Check for changed working directory.
    if new_config.has_key('working_directory'):
        wd = os.path.abspath(new_config['working_directory'])
        if nbmanager.notebook_dir != wd:
            if not os.path.exists(wd):
                raise IOError('Path not found: %s' % wd)
            nbmanager.notebook_dir = wd


def set_config(new_config={}):
    """ Reset config options to defaults, and then update (optionally)
    with the provided dictionary of options. """
    # The default base configuration.
    flask_app.base_config = dict(working_directory='.',
                                 template='collapse-input',
                                 debug=False,
                                 port=None)
    update_config(new_config)

set_config()

@flask_app.route('/')
def render_index():
    template = """<html>
    <body>
    <h2>Notebooks</h2>
    <ul>
        {% for notebook in notebooks %}
            <li><a href='{{ notebook.name }}'>{{notebook.name}}</a></li>
        {% endfor %}
    </ul>
    </body>
    </html>"""
    return flask.render_template_string(template, notebooks=nbmanager.list_notebooks('.'))

@flask_app.route('/<nbname>/')
def render_page(nbname, config={}):

    # Combine base config with any provided overrides.
    config = dict(flask_app.base_config, **config)

    global runner

    if not nbmanager.notebook_exists(nbname):
        print "Notebook %s does not exist." % nbname
        flask.abort(404)

    print "Loading notebook %s" % nbname
    #nbmanager.trust_notebook(nbname)
    nb = nbmanager.get_notebook(nbname)

    if config['run']:
        print "Making runner..."''

        # This is an ugly little bit to deal with a sporadic
        #  'queue empty' bug in jupyter that only seems to
        #  happen on the integration servers...
        #  see https://github.com/paulgb/runipy/issues/36
        N_RUN_RETRIES = 4
        from Queue import Empty

        for i in range(N_RUN_RETRIES):
            try:
                if runner is None:
                    make_notebook_runner_thread.join()

                # Do as complete of a reset of the kernel as we can.
                # Unfortunately, this doesn't really do a 'hard' reset
                # of any modules...
                class ResetCell(dict):
                    """Simulates just enough of a notebook cell to get this
                    'reset cell' executed using the existing runipy
                     machinery."""
                    input = "get_ipython().reset(new_session=True)"
                runner.run_cell(ResetCell())
                runner.nb = nb
                print "Running notebook"
                runner.run_notebook(skip_exceptions=True)
                break
            except Empty as e:
                print "WARNING: Empty bug happened."
                if i >= (N_RUN_RETRIES - 1):
                    raise
        nb = runner.nb
    # else:
    #     nb = nb['content']
    print "Exporting notebook"
    exporter = HTMLExporter(
        config=Config({
            'HTMLExporter': {
                'template_file': config['template'],
                'template_path': ['.', os.path.join(os.path.split(__file__)[0], 'templates')]
            }
        })
    )
    output, resources = exporter.from_notebook_node(
        convert(nb, current_nbformat)
    )
    print "Returning."
    return output

if __name__ == "__main__":
    flask_app.run()
