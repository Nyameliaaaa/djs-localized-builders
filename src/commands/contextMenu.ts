import { ContextMenuCommandBuilder as Builder, ContextMenuCommandType } from '@discordjs/builders';
import { getAllStrings, getDefaultString, joinKeys } from 'index';
import { BaseKeyMixin, PermsV2Mixin, NameMixin } from 'mixins';
import { mix, settings } from 'ts-mixer';
settings.initFunction = 'init';

export interface ContextMenuCommandBuilder extends PermsV2Mixin<Builder>, NameMixin<Builder>, BaseKeyMixin {}

@mix(PermsV2Mixin, NameMixin, BaseKeyMixin)
export class ContextMenuCommandBuilder {
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
