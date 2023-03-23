import { SlashCommandIntegerOption, SlashCommandNumberOption, SlashCommandStringOption } from '@discordjs/builders';
import { AutocompletableMixin, BaseKeyMixin, MinMaxNumberMixin } from 'mixins';
import { mix } from 'ts-mixer';

export interface NumberOption extends MinMaxNumberMixin<SlashCommandNumberOption>, BaseKeyMixin {}
@mix(MinMaxNumberMixin, BaseKeyMixin)
export class NumberOption {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandNumberOption();
    }
}

export interface IntegerOption extends MinMaxNumberMixin<SlashCommandIntegerOption>, BaseKeyMixin {}
@mix(MinMaxNumberMixin, BaseKeyMixin)
export class IntegerOption {
    constructor(baseKey?: string) {
        this.builder = new SlashCommandIntegerOption();
    }
}

export interface StringOption extends AutocompletableMixin<SlashCommandStringOption>, BaseKeyMixin {}
@mix(AutocompletableMixin, BaseKeyMixin)
export class StringOption {
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
