from os import path
from cs251tk.common import run


def clone_student(student, baseurl):
    if not path.exists(student):
        clone_url('{}/{}.git'.format(baseurl, student))


def clone_url(url):
    run(['git', 'clone', '--quiet', url])
