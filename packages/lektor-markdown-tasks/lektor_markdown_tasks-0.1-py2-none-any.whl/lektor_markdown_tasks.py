# -*- coding: utf-8 -*-
import re
from lektor.pluginsystem import Plugin


_task = re.compile(r'^\[(\s|x)\]+')

TYPES = {
    '[x]': '<li><input type="checkbox" class="task-list-item-checkbox" checked="checked" disabled="disabled">{}</li>',
    '[ ]': '<li><input type="checkbox" class="task-list-item-checkbox" disabled="disabled">{}</li>'
}


class TasksMixin(object):
    def list_item(self, text):
        match = _task.match(text)

        if match is None:
            return super(TasksMixin, self).paragraph(text)

        TYPE = TYPES[match.group(0)]
        return TYPE.format(text[match.end():])


class MarkdownTasksPlugin(Plugin):
    name = u'Markdown Tasks'
    description = u'Lektor markdown tasks.'

    def on_markdown_config(self, config, **extra):
        config.renderer_mixins.append(TasksMixin)
