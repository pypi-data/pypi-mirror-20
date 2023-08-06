# Copyright (c) 2014 by Ecreall under licence AGPL terms 
# avalaible on http://www.gnu.org/licenses/agpl.html 

# licence: AGPL
# author: Amen Souissi

from pyramid.view import view_config

from dace.processinstance.core import DEFAULTMAPPING_ACTIONS_VIEWS
from dace.objectofcollaboration.principal.util import get_current
from pontus.default_behavior import Cancel
from pontus.form import FormView
from pontus.schema import select, omit
from pontus.view_operation import MultipleView

from novaideo.content.processes.proposal_management.behaviors import (
    DuplicateProposal)
from novaideo.content.proposal import Proposal, ProposalSchema
from novaideo import _
from .edit_proposal import IdeaManagementView
from .create_proposal import ideas_choice, add_file_data
from ..filter import get_pending_challenges


class DuplicateProposalFormView(FormView):
    title = _('Duplicate')
    name = 'duplicateproposal'
    schema = select(ProposalSchema(),
                    ['challenge',
                     'title',
                     'description',
                     'keywords',
                     'text',
                     'related_ideas',
                     ('add_files', ['attached_files'])])

    behaviors = [DuplicateProposal, Cancel]
    formid = 'formduplicateproposal'

    def default_data(self):
        data = self.context.get_data(self.schema)
        files = []
        attached_files = self.context.attached_files
        data['add_files'] = {'attached_files': []}
        files = []
        for file_ in attached_files:
            file_data = add_file_data(file_)
            if file_data:
                files.append(file_data)

        if files:
            data['add_files']['attached_files'] = files

        challenge = self.context.challenge
        if challenge and not challenge.can_add_content:
            data['challenge'] = ''

        return data

    def before_update(self):
        user = get_current(self.request)
        has_challenges = len(get_pending_challenges(user)) > 0
        if not has_challenges:
            self.schema = omit(
                self.schema, ['challenge'])

        ideas_widget = ideas_choice(self.context, self.request)
        ideas_widget.item_css_class = 'hide-bloc'
        ideas_widget.css_class = 'controlled-items'
        self.schema.get('related_ideas').widget = ideas_widget


@view_config(
    name='duplicateproposal',
    context=Proposal,
    renderer='pontus:templates/views_templates/grid.pt',
    )
class DuplicateProposalView(MultipleView):
    title = _('Duplicate the proposal')
    name = 'duplicateproposal'
    template = 'pontus:templates/views_templates/simple_multipleview.pt'
    requirements = {'css_links': [],
                    'js_links': ['novaideo:static/js/ideas_management.js']}
    views = (DuplicateProposalFormView, IdeaManagementView)


DEFAULTMAPPING_ACTIONS_VIEWS.update(
    {DuplicateProposal: DuplicateProposalView})
