import {
	ApplicationCommandOptionAllowedChannelTypes,
	normalizeArray,
	RestOrArray,
	SlashCommandAttachmentOption,
	SlashCommandBooleanOption,
	SlashCommandChannelOption
} from '@discordjs/builders';
import { mix } from 'ts-mixer';
import { BaseKeyMixin, OptionMixin } from '$mixins';

export interface SlashCommandAttachmentOptionBuilder extends OptionMixin<SlashCommandAttachmentOption>, BaseKeyMixin {}
/**
 * @group Options
 */
@mix(OptionMixin, BaseKeyMixin)
export class SlashCommandAttachmentOptionBuilder {
	constructor(baseKey?: string) {
		this.builder = new SlashCommandAttachmentOption();
	}
}

export interface SlashCommandBooleanOptionBuilder extends OptionMixin<SlashCommandBooleanOption>, BaseKeyMixin {}
/**
 * @group Options
 */
@mix(OptionMixin, BaseKeyMixin)
export class SlashCommandBooleanOptionBuilder {
	constructor(baseKey?: string) {
		this.builder = new SlashCommandBooleanOption();
	}
}

export interface SlashCommandChannelOptionBuilder extends OptionMixin<SlashCommandChannelOption>, BaseKeyMixin {}
/**
 * @group Options
 */
@mix(OptionMixin, BaseKeyMixin)
export class SlashCommandChannelOptionBuilder {
	constructor(baseKey?: string) {
		this.builder = new SlashCommandChannelOption();
	}

	addChannelTypes(...channelTypes: RestOrArray<ApplicationCommandOptionAllowedChannelTypes>) {
		this.builder.addChannelTypes(...normalizeArray(channelTypes));
	}

	get channelTypes() {
		return this.builder.channel_types;
	}
}
