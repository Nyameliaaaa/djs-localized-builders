import { SlashCommandIntegerOption, SlashCommandNumberOption } from '@discordjs/builders';
import { BaseKeyMixin, MinMaxNumberMixin } from 'mixins';
import { mix } from 'ts-mixer';

export interface NumberOption extends MinMaxNumberMixin<SlashCommandNumberOption>, BaseKeyMixin {}
@mix(MinMaxNumberMixin, BaseKeyMixin)
export class NumberOption {
    // eslint-disable-next-line
    constructor(baseKey?: string) {
        this.builder = new SlashCommandNumberOption();
    }
}

export interface IntegerOption extends MinMaxNumberMixin<SlashCommandIntegerOption>, BaseKeyMixin {}
@mix(MinMaxNumberMixin, BaseKeyMixin)
export class IntegerOption {
    // eslint-disable-next-line
    constructor(baseKey?: string) {
        this.builder = new SlashCommandIntegerOption();
    }
}
