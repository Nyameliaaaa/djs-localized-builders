import { SlashCommandIntegerOption, SlashCommandNumberOption, SlashCommandStringOption } from '@discordjs/builders';
import { AutocompletableMixin, BaseKeyMixin, MinMaxNumberMixin } from 'mixins';
import { mix } from 'ts-mixer';

export interface SlashCommandNumberOptionBuilder extends MinMaxNumberMixin<SlashCommandNumberOption>, BaseKeyMixin {}
@mix(MinMaxNumberMixin, BaseKeyMixin)
export class SlashCommandNumberOptionBuilder {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandNumberOption();
    }
}

export interface SlashCommandIntegerOptionBuilder extends MinMaxNumberMixin<SlashCommandIntegerOption>, BaseKeyMixin {}
@mix(MinMaxNumberMixin, BaseKeyMixin)
export class SlashCommandIntegerOptionBuilder {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandIntegerOption();
    }
}

export interface SlashCommandStringOptionBuilder
    extends AutocompletableMixin<SlashCommandStringOption, string>,
        BaseKeyMixin {}
@mix(AutocompletableMixin, BaseKeyMixin)
export class SlashCommandStringOptionBuilder {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandStringOption();
    }

    setMinLength(value: number) {
        this.builder.setMinLength(value);
        return this;
    }

    setMaxLength(value: number) {
        this.builder.setMaxLength(value);
        return this;
    }

    get minLength() {
        return this.builder.min_length;
    }

    get maxLength() {
        return this.builder.max_length;
    }
}
