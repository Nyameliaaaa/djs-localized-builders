import { SlashCommandMentionableOption, SlashCommandRoleOption, SlashCommandUserOption } from '@discordjs/builders';
import { BaseKeyMixin, OptionMixin } from 'mixins';
import { mix } from 'ts-mixer';

export interface SlashCommandMentionableOptionBuilder
    extends OptionMixin<SlashCommandMentionableOption>,
        BaseKeyMixin {}
@mix(OptionMixin, BaseKeyMixin)
export class SlashCommandMentionableOptionBuilder {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandMentionableOption();
    }
}

export interface SlashCommandUserOptionBuilder extends OptionMixin<SlashCommandUserOption>, BaseKeyMixin {}
@mix(OptionMixin, BaseKeyMixin)
export class SlashCommandUserOptionBuilder {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandUserOption();
    }
}

export interface SlashCommandRoleOptionBuilder extends OptionMixin<SlashCommandRoleOption>, BaseKeyMixin {}
@mix(OptionMixin, BaseKeyMixin)
export class SlashCommandRoleOptionBuilder {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandRoleOption();
    }
}
