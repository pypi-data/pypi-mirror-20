__kupfer_name__ = _('Jira')
__version__ = _('__version__ = "0.1.2"')
__author__ = _('Hugo Sena Ribeiro <hugosenari@gmail.com>')
__description__ = _('''Kupfer plugin to control Jira''')

__kupfer_sources__ = ("ProjectSource",)
__kupfer_actions__ = ("Issue", "Show", "Comment", "SaveChanges")


import re
from jira import JIRA
from kupfer.utils import show_url
from kupfer.plugin_support import \
    PluginSettings, check_keyring_support, UserNamePassword
check_keyring_support()

__kupfer_settings__ = PluginSettings( 
    {
        "key" : "jira_login",
        "label": "Login",
        "type": UserNamePassword,
        "value": None
    },
    {
        "key" : "jira_url",
        "label": "Jira URL",
        "type": str,
        "value": ""
    }
)

from kupfer.objects import Leaf 

FIELD_BLACK_LIST = (
    'customfield.*',
    'comment',
    '.*timeestimate.*',
    'lastViewd',
    'issuelinks',
    'aggragate.*',
    'votes',
    'attachement',
    'updated',
    'subtasks',
    'worklog',
    'resolutiondate',
    'components',
    'issuetype',
    'status',
    'reporter'
)
class IssueLeaf(Leaf):
    jira_jira = None
    def __init__(self, obj, fields=None, transition=None):
        Leaf.__init__(self, obj, obj.key)
        self.fields = fields
        self.transition = None
        
    def get_description(self):
        return self.fields or self.object.fields.summary

    def get_actions(self):
        valid_fields = []
        for field in self.object.raw['fields'].items():
            for block in FIELD_BLACK_LIST:
                if re.match(block, field[0]):
                    break
            else:
                print("valid field", field[0])
                valid_fields.append(field)
        for field in valid_fields:
                yield IssueChange(field, self.object, initialize_jira())


class ProjectLeaf(Leaf):
    def __init__(self, obj, jira):
        Leaf.__init__(self, obj, obj.key)
        self.jira = jira
        
    def get_description(self):
        return self.object.name


from kupfer.objects import Source
class ProjectSource(Source):
    def __init__(self):
        Source.__init__(self, "Jira Projects")
        self.resource = None
    
    def get_items(self):
        if self.resource:
            for obj in self.resource.projects():
                yield ProjectLeaf(obj, self.resource)
    
    def initialize(self):
        self.resource = initialize_jira()


def initialize_jira():
    if not IssueLeaf.jira_jira:
        jira_url = __kupfer_settings__['jira_url']
        jira_login = __kupfer_settings__['jira_login']
        if jira_url and \
            jira_login and \
            jira_login.username and \
            jira_login.password:
            IssueLeaf.jira_jira = JIRA(jira_url,
                basic_auth=(
                    jira_login.username,
                    jira_login.password
                )
            )
    return IssueLeaf.jira_jira


from kupfer.objects import Action, TextLeaf
class Issue(Action):
    def __init__(self):
        Action.__init__(self, name="Jira Issue")
        self.jira = None
    
    def activate(self, item):
        self.jira = self.jira or initialize_jira()
        i = get_issue(item, self.jira)
        return IssueLeaf(i)
    
    def item_types(self):
        yield TextLeaf
            
    def valid_for_item(self, item):
        return is_issue(item)
    
    def has_result(self):
        return True

class Show(Action):
    def __init__(self):
        Action.__init__(self, name="Show Issue/Project")
        self.jira = None
    
    def get_description(self):
        return "Open issue/project in browser"
    
    def activate(self, item):
        self.jira = self.jira or initialize_jira()
        url = None
        if is_issue(item):
            i = get_issue(item, self.jira)
            url = i.permalink()
        else:
            p = get_project(item, self.jira)
            url = __kupfer_settings__['jira_url'] + \
                '/projects/' + p.key + '/summary'
        show_url(url)
            
    def valid_for_item(self, item):
        return is_issue(item) or is_project(item)
    
    def item_types(self):
        yield IssueLeaf
        yield ProjectLeaf
        yield TextLeaf


class Comment(Action):
    def __init__(self):
        Action.__init__(self, name="Add comment to issue")
        self.jira = None
            
    def valid_for_item(self, item):
        return is_issue(item)
    
    def item_types(self):
        yield IssueLeaf
        yield TextLeaf
    
    def activate(self, item, iobj):
        self.jira = self.jira or initialize_jira()
        i = get_issue(item, self.jira)
        comment = self.jira.add_comment(i, iobj.object)
        return item
            
    def valid_for_item(self, item):
        return is_issue(item)

    def requires_object(self):
        return True

    def object_types(self, for_item=None):
        yield TextLeaf

    def valid_object(self, iobj, for_item=None):
        return type(iobj) is TextLeaf
    
    def has_result(self):
        return True


class SaveChanges(Action):
    def __init__(self):
        Action.__init__(self, name="Save issue changes")
        self.jira = None
    
    def item_types(self):
        yield IssueLeaf

    def valid_for_item(self, item):
        return item.fields or item.transition
    
    def get_description(self):
        return "Send changes to server"

    def activate(self, item, iobj):
        self.jira = self.jira or initialize_jira()
        i = get_issue(item, self.jira)
        if item.transition:
            if item.fields:
                self.jira.transition_issue(i, item.transition, fields=item.fields)
            else:
                self.jira.transition_issue(i, item.transition)
        else:
            i.update(fields=item.fields)
        item.fields = None
        item.transition = None


class IssueChange(Action):
    def __init__(self, field, issue, jira):
        Action.__init__(self, name="Change " + field[0])
        self.field = field
        self.jira = jira
        self.issue = issue

    def requires_object(self):
        return True

    def activate(self, item, iobj):
        print(self.field, self.issue, self.jira, item, iobj)

    def valid_object(self, iobj, for_item=None):
        return type(iobj) is TextLeaf

    # def object_source(self, for_item=None):
    #     return _IssueFieldVal(self.field, self.issue, self.jira)


class _IssueFieldValues(Source):
    def __init__(self, field, issue, jira):
        Source.__init__(self, _("Issue " + field[0] + " values"))
        self.field = field
        self.jira = jira
        self.issue = issue

    def get_items(self):
        return ()

    def provides(self):
        yield _IssueField


class _IssueField(Leaf):
    def __init__(self, obj, field, issue, jira):
        Leaf.__init__(self, obj, "Issue " + field[0] + " value")
        self.field = field
        self.jira = jira
        self.issue = issue


issue_regexp = '^[a-zA-Z0-9]+-[\d]+$'
from jira import Issue as issue
def get_issue(item, jira):
    if isinstance(item, issue):
        return item
    if isinstance(item.object, issue):
        return item.object
    key = None
    if re.match(issue_regexp, str(item)):
        key = str(item)
    elif re.match(issue_regexp, str(item.object)):
        key = str(item.object)
    if key:
        return jira.issue(key)


def is_issue(item):
    if isinstance(item, issue):
        return item
    if isinstance(item.object, issue):
        return item.object
    if re.match(issue_regexp, str(item)):
        return True
    elif re.match(issue_regexp, str(item.object)):
        return True


project_regexp = '^[a-zA-Z0-9]+$'
from jira import Project as project
def get_project(item, jira):
    if isinstance(item, project):
        return item
    if isinstance(item.object, project):
        return item.object
    key = None
    if re.match(project_regexp, str(item)):
        key = str(item)
    elif re.match(project_regexp, str(item.object)):
        key = str(item.object)
    if key:
        return jira.project(key)


def is_project(item):
    if isinstance(item, project):
        return item
    if isinstance(item.object, project):
        return item.object
    if re.match(project_regexp, str(item)):
        return True
    elif re.match(project_regexp, str(item.object)):
        return True