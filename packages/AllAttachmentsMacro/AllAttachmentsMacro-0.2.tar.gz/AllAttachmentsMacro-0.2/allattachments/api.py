# -*- coding: utf-8 -*-
#
# Copyright (C) 2008 Daan van Etten <daan@stuq.nl>
# All rights reserved.
# This work is licensed under the Creative Commons
# Attribution-Noncommercial-Share Alike 3.0 License.
# To view a copy of this license, visit
# http://creativecommons.org/licenses/by-nc-sa/3.0/ or send
# a letter to Creative Commons, 171 Second Street, Suite 300
# San Francisco, California, 94105, USA.

from trac.attachment import Attachment
from trac.resource import ResourceNotFound
from trac.util.html import html
from trac.util.text import pretty_size
from trac.wiki.macros import WikiMacroBase


class AllAttachmentsMacro(WikiMacroBase):
    """Shows all attachments on the Trac site.

       The first argument is the filter for which attachments to show.
       The filter can have the value 'ticket' or 'wiki'. Omitting the filter
       argument shows all attachments.

       Examples:

       {{{
           [[AllAttachments()]]       # Show all attachments
           [[AllAttachments(ticket)]] # Show attachments linked to tickets
           [[AllAttachments(wiki)]]   # Show attachments linked to wiki pages
       }}}
    """

    def expand_macro(self, formatter, name, content):
        attachment_type = ""
        if content:
            argv = [arg.strip() for arg in content.split(',')]
            if len(argv) > 0:
                attachment_type = argv[0]

        with self.env.db_transaction as db:
            if attachment_type is None or attachment_type == "":
                attachments = db("""
                   SELECT type,id,filename,size,time,
                    description,author,ipnr FROM attachment
                   """)
            else:
                attachments = db("""
                   SELECT type,id,filename,size,time,
                    description,author,ipnr FROM attachment
                   WHERE type=%s
                   """, (attachment_type, ))

        formatters = {
            'wiki': formatter.href.wiki,
            'ticket': formatter.href.ticket,
            'milestone': formatter.href.milestone,
        }
        types = {
            'wiki': '',
            'ticket': 'ticket ',
            'milestone': 'milestone ',
        }

        return html.ul(
            [html.li(
                html.a(filename, href=formatter.href.attachment(type + '/' +
                                                                id + '/' +
                                                                filename)),
                " (", html.span(pretty_size(size), title=size), ") - added by ",
                html.em(author), " to ",
                html.a(types[type] + ' ' + id, href=formatters[type](id)), ' ')
             for type, id, filename, size, time, description, author, ipnr
             in attachments
             if self._has_perm(type, id, filename, formatter.context)])

    def _has_perm(self, parent_realm, parent_id, filename, context):
        try:
            attachment = Attachment(self.env, parent_realm, parent_id, filename)
        except ResourceNotFound:
            return False
        return 'ATTACHMENT_VIEW' in context.req.perm(attachment.resource)
