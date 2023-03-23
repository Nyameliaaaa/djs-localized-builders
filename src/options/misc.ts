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

export interface AttachmentOption extends OptionMixin<SlashCommandAttachmentOption>, BaseKeyMixin {}
@mix(OptionMixin, BaseKeyMixin)
export class AttachmentOption {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandAttachmentOption();
    }
}

export interface BooleanOption extends OptionMixin<SlashCommandBooleanOption>, BaseKeyMixin {}
@mix(OptionMixin, BaseKeyMixin)
export class BooleanOption {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandBooleanOption();
    }
}

export interface ChannelOption extends OptionMixin<SlashCommandChannelOption>, BaseKeyMixin {}
@mix(OptionMixin, BaseKeyMixin)
export class ChannelOption {
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
