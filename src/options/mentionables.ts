import { SlashCommandMentionableOption, SlashCommandRoleOption, SlashCommandUserOption } from '@discordjs/builders';
import { mix } from 'ts-mixer';
import { KeySegmentMixin, OptionMixin } from '$mixins';

export interface SlashCommandMentionableOptionBuilder
	extends OptionMixin<SlashCommandMentionableOption>,
		KeySegmentMixin {}

/**
 * @group Options
 */
@mix(OptionMixin, KeySegmentMixin)
export class SlashCommandMentionableOptionBuilder {
	constructor(keySegment?: string) {
		this.builder = new SlashCommandMentionableOption();
	}
}

export interface SlashCommandUserOptionBuilder extends OptionMixin<SlashCommandUserOption>, KeySegmentMixin {}

/**
 * @group Options
 */
@mix(OptionMixin, KeySegmentMixin)
export class SlashCommandUserOptionBuilder {
	constructor(keySegment?: string) {
		this.builder = new SlashCommandUserOption();
	}
}

export interface SlashCommandRoleOptionBuilder extends OptionMixin<SlashCommandRoleOption>, KeySegmentMixin {}
/**
 * @group Options
 */
@mix(OptionMixin, KeySegmentMixin)
export class SlashCommandRoleOptionBuilder {
	constructor(keySegment?: string) {
		this.builder = new SlashCommandRoleOption();
	}
}
