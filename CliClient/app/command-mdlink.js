const { BaseCommand } = require('./base-command.js');
const { app } = require('./app.js');
const { _ } = require('lib/locale.js');
const BaseModel = require('lib/BaseModel.js');
const Note = require('lib/models/Note.js');

class Command extends BaseCommand {

    usage() {
        return 'mdlink <note>';
    }

    description() {
        return _('Display markdown link.');
    }

    async action(args) {
        const title = args['note'];

        let item = await app().loadItem(BaseModel.TYPE_NOTE, title, { parent: app().currentFolder() });
        if (!item) throw new Error(_('Cannot find "%s".', title));

        const content = Note.markdownTag(item);
        this.stdout(content);

        app().gui().showConsole();
    }

}

module.exports = Command;