import {
    normalizeArray,
    RestOrArray,
    SlashCommandIntegerOption,
    SlashCommandNumberOption,
    SlashCommandStringOption
} from '@discordjs/builders';
import { APIApplicationCommandOptionChoice } from 'discord-api-types/v10';
import { getAllStrings, getDefaultString, joinKeys, OptionResolvable } from 'index';
import { mix } from 'ts-mixer';
import { BaseKeyMixin } from './base';
import { NameAndDescriptionMixin } from './index';

export interface OptionMixin<T extends OptionResolvable> extends NameAndDescriptionMixin<T>, BaseKeyMixin {}

@mix(NameAndDescriptionMixin, BaseKeyMixin)
export class OptionMixin<T extends OptionResolvable> {
    setRequired(required: boolean) {
        this.builder.setRequired(required);
        return this;
    }

    get required() {
        return this.builder.required;
    }
}

export interface AutocompletableMixin<
    T extends SlashCommandNumberOption | SlashCommandIntegerOption | SlashCommandStringOption,
    V extends number | string = T extends SlashCommandNumberOption | SlashCommandIntegerOption ? number : string
> extends OptionMixin<T> {}

@mix(OptionMixin)
export class AutocompletableMixin<
    T extends SlashCommandNumberOption | SlashCommandIntegerOption | SlashCommandStringOption,
    V extends number | string = T extends SlashCommandNumberOption | SlashCommandIntegerOption ? number : string
> {
    choiceQueue: Array<V | { key: string; value: V }> = [];

    setAutocomplete(autocomplete: boolean) {
        this.builder.setAutocomplete(autocomplete);
        return this;
    }

    addChoices(...choices: RestOrArray<V | { key: string; value: V }>) {
        this.choiceQueue.push(...normalizeArray(choices));
        return this;
    }

    setChoices(...choices: RestOrArray<V | { key: string; value: V }>) {
        this.choiceQueue = normalizeArray(choices);
        return this;
    }

    hydrateChoices(baseKey: string) {
        const preparedChoices = this.choiceQueue.map(val => {
            const key = joinKeys([baseKey, 'choices', val instanceof Object ? val.key.toString() : val.toString()]);

            const name = getDefaultString(key, 'commands');
            const name_localizations = getAllStrings(key, 'commands');

            return {
                name,
                name_localizations,
                value: val instanceof Object ? val.value : val
            };
        });

        this.choiceQueue = [];

        if (this.builder instanceof SlashCommandIntegerOption || this.builder instanceof SlashCommandNumberOption) {
            this.builder.setChoices(...(preparedChoices as APIApplicationCommandOptionChoice<number>[]));
        } else {
            this.builder.setChoices(...(preparedChoices as APIApplicationCommandOptionChoice<string>[]));
        }

        return this;
    }

    get choices():
        | APIApplicationCommandOptionChoice<number>[]
        | APIApplicationCommandOptionChoice<string>[]
        | undefined {
        return this.builder.choices;
    }

    get autocomplete() {
        return this.builder.autocomplete;
    }
}

export interface MinMaxNumberMixin<T extends SlashCommandNumberOption | SlashCommandIntegerOption>
    extends AutocompletableMixin<T, number> {}

@mix(AutocompletableMixin)
export class MinMaxNumberMixin<T extends SlashCommandNumberOption | SlashCommandIntegerOption> {
    setMinValue(value: number) {
        this.builder.setMinValue(value);
        return this;
    }

    setMaxValue(value: number) {
        this.builder.setMaxValue(value);
        return this;
    }

    get minValue() {
        return this.builder.min_value;
    }

    get maxValue() {
        return this.builder.max_value;
    }
}
