import os

def path():

	return os.path.join(os.path.dirname(__file__),os.path.pardir)


APP_DIR = path()