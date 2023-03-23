import { SlashCommandMentionableOption, SlashCommandRoleOption, SlashCommandUserOption } from '@discordjs/builders';
import { BaseKeyMixin, OptionMixin } from 'mixins';
import { mix } from 'ts-mixer';

export interface MentionableOption extends OptionMixin<SlashCommandMentionableOption>, BaseKeyMixin {}
@mix(OptionMixin, BaseKeyMixin)
export class MentionableOption {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandMentionableOption();
    }
}

export interface UserOption extends OptionMixin<SlashCommandUserOption>, BaseKeyMixin {}
@mix(OptionMixin, BaseKeyMixin)
export class UserOption {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandUserOption();
    }
}

export interface RoleOption extends OptionMixin<SlashCommandRoleOption>, BaseKeyMixin {}
@mix(OptionMixin, BaseKeyMixin)
export class RoleOption {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandRoleOption();
    }
}
