import { normalizeArray, type RestOrArray, SlashCommandIntegerOption, SlashCommandNumberOption, SlashCommandStringOption } from '@discordjs/builders';
import { APIApplicationCommandOptionChoice } from 'discord-api-types/v10';
import { mix } from 'ts-mixer';
import { resolveAllStrings, resolveDefaultString, joinKeys } from '$lib';
import type { OptionResolvable } from '$types';
import { BaseKeyMixin } from './base';
import { NameAndDescriptionMixin } from './nameAndDescription';

export interface OptionMixin<_T extends OptionResolvable> extends NameAndDescriptionMixin<_T>, BaseKeyMixin {}

@mix(NameAndDescriptionMixin, BaseKeyMixin)
export class OptionMixin<_T extends OptionResolvable> {
	setRequired(required: boolean) {
		this.builder.setRequired(required);
		return this;
	}

	get required() {
		return this.builder.required;
	}
}

export interface AutocompletableMixin<
	_T extends SlashCommandNumberOption | SlashCommandIntegerOption | SlashCommandStringOption,
	_V extends number | string = _T extends SlashCommandNumberOption | SlashCommandIntegerOption ? number : string
> extends OptionMixin<_T> {}

@mix(OptionMixin)
export class AutocompletableMixin<
	_T extends SlashCommandNumberOption | SlashCommandIntegerOption | SlashCommandStringOption,
	_V extends number | string = _T extends SlashCommandNumberOption | SlashCommandIntegerOption ? number : string
> {
	private choiceQueue: Array<_V | { key: string; value: _V }> = [];

	setAutocomplete(autocomplete: boolean) {
		this.builder.setAutocomplete(autocomplete);
		return this;
	}

	addChoices(...choices: RestOrArray<_V | { key: string; value: _V }>) {
		this.choiceQueue.push(...normalizeArray(choices));
		return this;
	}

	setChoices(...choices: RestOrArray<_V | { key: string; value: _V }>) {
		this.choiceQueue = normalizeArray(choices);
		return this;
	}

	/**
	 * @internal
	 */
	hydrateChoices(baseKey: string) {
		const preparedChoices = this.choiceQueue.map(val => {
			const key = joinKeys([baseKey, 'choices', val instanceof Object ? val.key.toString() : val.toString()]);

			const name = resolveDefaultString(key, 'commands');
			const name_localizations = resolveAllStrings(key, 'commands');

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

	get choices() {
		return this.builder.choices;
	}

	get autocomplete() {
		return this.builder.autocomplete;
	}
}

export interface MinMaxNumberMixin<_T extends SlashCommandNumberOption | SlashCommandIntegerOption> extends AutocompletableMixin<_T, number> {}

@mix(AutocompletableMixin)
export class MinMaxNumberMixin<_T extends SlashCommandNumberOption | SlashCommandIntegerOption> {
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
