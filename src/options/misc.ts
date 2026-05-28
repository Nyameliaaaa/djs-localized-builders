import {
	ApplicationCommandOptionAllowedChannelTypes,
	normalizeArray,
	RestOrArray,
	SlashCommandAttachmentOption,
	SlashCommandBooleanOption,
	SlashCommandChannelOption
} from '@discordjs/builders';
import { mix } from 'ts-mixer';
import { KeySegmentMixin, OptionMixin } from '$mixins';

export interface SlashCommandAttachmentOptionBuilder extends OptionMixin<SlashCommandAttachmentOption>, KeySegmentMixin {}
/**
 * @group Options
 */
@mix(OptionMixin, KeySegmentMixin)
export class SlashCommandAttachmentOptionBuilder {
	constructor(keySegment?: string) {
		this.builder = new SlashCommandAttachmentOption();
	}
}

export interface SlashCommandBooleanOptionBuilder extends OptionMixin<SlashCommandBooleanOption>, KeySegmentMixin {}
/**
 * @group Options
 */
@mix(OptionMixin, KeySegmentMixin)
export class SlashCommandBooleanOptionBuilder {
	constructor(keySegment?: string) {
		this.builder = new SlashCommandBooleanOption();
	}
}

export interface SlashCommandChannelOptionBuilder extends OptionMixin<SlashCommandChannelOption>, KeySegmentMixin {}
/**
 * @group Options
 */
@mix(OptionMixin, KeySegmentMixin)
export class SlashCommandChannelOptionBuilder {
	constructor(keySegment?: string) {
		this.builder = new SlashCommandChannelOption();
	}

	addChannelTypes(...channelTypes: RestOrArray<ApplicationCommandOptionAllowedChannelTypes>) {
		this.builder.addChannelTypes(...normalizeArray(channelTypes));
	}

	get channelTypes() {
		return this.builder.channel_types;
	}
}
