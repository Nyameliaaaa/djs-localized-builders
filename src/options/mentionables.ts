import { SlashCommandMentionableOption, SlashCommandRoleOption, SlashCommandUserOption } from '@discordjs/builders';
import { mix } from 'ts-mixer';
import { BaseKeyMixin, OptionMixin } from '$mixins';

export interface SlashCommandMentionableOptionBuilder extends OptionMixin<SlashCommandMentionableOption>, BaseKeyMixin {}

/**
 * @group Options
 */
@mix(OptionMixin, BaseKeyMixin)
export class SlashCommandMentionableOptionBuilder {
	constructor(baseKey?: string) {
		this.builder = new SlashCommandMentionableOption();
	}
}

export interface SlashCommandUserOptionBuilder extends OptionMixin<SlashCommandUserOption>, BaseKeyMixin {}

/**
 * @group Options
 */
@mix(OptionMixin, BaseKeyMixin)
export class SlashCommandUserOptionBuilder {
	constructor(baseKey?: string) {
		this.builder = new SlashCommandUserOption();
	}
}

export interface SlashCommandRoleOptionBuilder extends OptionMixin<SlashCommandRoleOption>, BaseKeyMixin {}
/**
 * @group Options
 */
@mix(OptionMixin, BaseKeyMixin)
export class SlashCommandRoleOptionBuilder {
	constructor(baseKey?: string) {
		this.builder = new SlashCommandRoleOption();
	}
}
