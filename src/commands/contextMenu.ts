import { ContextMenuCommandBuilder as Builder, ContextMenuCommandType } from '@discordjs/builders';
import { mix } from 'ts-mixer';
import { getAllStrings, getDefaultString, joinKeys } from '$lib';
import { BaseKeyMixin, NameMixin, PermsV2Mixin } from '$mixins';

export interface ContextMenuCommandBuilder extends PermsV2Mixin<Builder>, NameMixin<Builder>, BaseKeyMixin {}

/**
 * @group Commands
 */
@mix(PermsV2Mixin, NameMixin, BaseKeyMixin)
export class ContextMenuCommandBuilder {
	constructor(baseKey?: string) {
		this.builder = new Builder();
	}

	/**
	 * @internal
	 */
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
