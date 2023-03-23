import { ContextMenuCommandBuilder as Builder, ContextMenuCommandType } from '@discordjs/builders';
import { getDefaultString, joinKeys, getAllStrings } from 'index';
import { BaseKeyMixin } from 'mixins/base';
import { PermsV2Mixin, SharedOptionsMixin } from 'mixins/commands';
import { NameMixin } from 'mixins/nameAndDescription';
import { mix } from 'ts-mixer';

export interface ContextMenuCommandBuilder extends PermsV2Mixin<Builder>, NameMixin<Builder>, BaseKeyMixin {}

@mix(PermsV2Mixin, NameMixin, BaseKeyMixin)
export class ContextMenuCommandBuilder {
    // eslint-disable-next-line
    constructor(baseKey?: string) {
        this.builder = new Builder();
    }

    protected init(baseKey?: string) {
        if (baseKey) {
            this.setName(getDefaultString(joinKeys([baseKey, 'context']), 'commands'));
            this.setNameLocalizations(getAllStrings(joinKeys([baseKey, 'context']), 'commands'));
        }
    }

    setType(type: ContextMenuCommandType) {
        this.builder.setType(type);
        return this;
    }
}
