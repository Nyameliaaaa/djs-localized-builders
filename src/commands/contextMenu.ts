import { ContextMenuCommandBuilder as Builder, ContextMenuCommandType } from '@discordjs/builders';
import { mix } from 'ts-mixer';
import { joinKeys, resolveAllStrings, resolveDefaultString } from '$lib';
import { KeySegmentMixin, NameMixin, PermsV2Mixin } from '$mixins';

export interface ContextMenuCommandBuilder extends PermsV2Mixin<Builder>, NameMixin<Builder>, KeySegmentMixin {}

/**
 * @group Commands
 */
@mix(PermsV2Mixin, NameMixin, KeySegmentMixin)
export class ContextMenuCommandBuilder {
	constructor(keySegment?: string) {
		this.builder = new Builder();
	}

	/**
	 * @internal
	 */
	protected init(keySegment?: string) {
		if (keySegment) {
			this.setName(resolveDefaultString(joinKeys([keySegment, 'context']), 'commands'));
			this.setNameLocalizations(resolveAllStrings(joinKeys([keySegment, 'context']), 'commands'));
		}
	}

	setType(type: ContextMenuCommandType) {
		this.builder.setType(type);
		return this;
	}
}
