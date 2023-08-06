""" Project definition for testing a project with all requirements and sources, but no source ids. """

from hqlib import metric_source, requirement
from hqlib.domain import Project, Product, Application, Component, Team, Document, Person

# Sources
HISTORY = metric_source.History('tests/integrationtests/test_no_source_ids/history.json')
GIT = metric_source.Git(url='http://git/repo')
SONAR = metric_source.Sonar('http://sonar/')
JIRA = metric_source.Jira(url='http://jira/', username='user', password='pass')

# The project
PROJECT = Project(
    'Integrationtest', name='all requirements and sources, but no source ids',
    metric_sources={
        metric_source.History: HISTORY,
        metric_source.ArchiveSystem: GIT,
        metric_source.VersionControlSystem: GIT,
        metric_source.Jira: JIRA,
        metric_source.Sonar: SONAR},
    requirements=[requirement.TrustedProductMaintainability, requirement.Web, requirement.JavaScript,
                  requirement.CSharp, requirement.Java, requirement.TrackManualLTCs,
                  requirement.TrackBugs, requirement.TrackTechnicalDebt,
                  requirement.TrackActions, requirement.TrackRisks, requirement.TrackSecurityAndPerformanceRisks,
                  requirement.TrackReadyUS, requirement.TrackJavaConsistency,
                  requirement.TrackCIJobs, requirement.TrackSonarVersion, requirement.OpenVAS])

# Documents.
DOC = Document(name='Document XYZ')
PROJECT.add_document(DOC)

# Teams of the project.
TEAM = Team(
    name='Team 123',
    requirements=[requirement.ScrumTeam, requirement.TrackSpirit, requirement.TrackAbsence])
TEAM.add_member(Person(name='Person 1'))
TEAM.add_member(Person(name='Person 2'))
PROJECT.add_team(TEAM)

# Products the project(s) develop(s).
PRODUCT = Product(
    short_name='PR', name='Product ABC',
    requirements=[requirement.OWASPDependencies, requirement.OWASPZAP,
                  requirement.UserStoriesAndLTCs, requirement.UnitTests, requirement.ART, requirement.ARTCoverage,
                  requirement.CodeQuality, requirement.PerformanceLoad, requirement.PerformanceEndurance,
                  requirement.PerformanceScalability, requirement.TrackBranches],
    art=Product(
        name='Product ABC ART', requirements=[requirement.CodeQuality, requirement.TrackBranches]),
    jsf=Product(
        name='Product ABC JSF', requirements=[requirement.JSFCodeQuality]))


APPLICATION = Application(short_name='AP', name='Application FOO')
COMPONENT = Component(short_name='CO', name='Component FOO')

PROJECT.add_product(PRODUCT)
PROJECT.add_product(APPLICATION)
PROJECT.add_product(COMPONENT)

# Dashboard layout

# Columns in the dashboard is specified as a list of tuples. Each tuple
# contains a column header and the column span.
DASHBOARD_COLUMNS = [('Products', 1), ('Teams', 1), ('Algemeen', 2)]

# Rows in the dashboard is a list of row tuples. Each row tuple consists of
# tuples that describe a cell in the dashboard. Each cell is a tuple containing
# the product or team and the color. Optionally the cell tuple can contain a
# third value which is a tuple containing the column and row span for the cell.
DASHBOARD_ROWS = [((PRODUCT, 'lightsteelblue'), (TEAM, 'lavender', (1, 3)), ('PD', 'lightgrey'), ('PE', 'lightgrey')),
                  ((APPLICATION, 'lightsteelblue'), ('PC', 'lightgrey', (1, 2)), ('MM', 'lightgrey', (1, 2))),
                  ((COMPONENT, 'lightsteelblue'),)]

PROJECT.set_dashboard(DASHBOARD_COLUMNS, DASHBOARD_ROWS)
