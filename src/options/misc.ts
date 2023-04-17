import {
    ApplicationCommandOptionAllowedChannelTypes,
    normalizeArray,
    RestOrArray,
    SlashCommandAttachmentOption,
    SlashCommandBooleanOption,
    SlashCommandChannelOption
} from '@discordjs/builders';
import { BaseKeyMixin } from 'mixins/base';
import { OptionMixin } from 'mixins/options';
import { mix } from 'ts-mixer';

export interface SlashCommandAttachmentOptionBuilder extends OptionMixin<SlashCommandAttachmentOption>, BaseKeyMixin {}
@mix(OptionMixin, BaseKeyMixin)
export class SlashCommandAttachmentOptionBuilder {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandAttachmentOption();
    }
}

export interface SlashCommandBooleanOptionBuilder extends OptionMixin<SlashCommandBooleanOption>, BaseKeyMixin {}
@mix(OptionMixin, BaseKeyMixin)
export class SlashCommandBooleanOptionBuilder {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandBooleanOption();
    }
}

export interface SlashCommandChannelOptionBuilder extends OptionMixin<SlashCommandChannelOption>, BaseKeyMixin {}
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
