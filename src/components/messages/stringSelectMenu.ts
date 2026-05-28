import { normalizeArray, RestOrArray, StringSelectMenuBuilder as StringBuilder } from '@discordjs/builders';
import type { LocalizationMap } from 'discord-api-types/v10';
import { mix } from 'ts-mixer';
import { joinKeys } from '$lib';
import { KeySegmentMixin, BuilderMixin, SelectMenuMixin } from '$mixins';
import { LocaleString } from '$types';
import { StringSelectMenuOptionBuilder } from './stringMenuOption';

export interface StringSelectMenuBuilder extends BuilderMixin<StringBuilder>, KeySegmentMixin, SelectMenuMixin<StringBuilder> {}

@mix(BuilderMixin, KeySegmentMixin, SelectMenuMixin)
export class StringSelectMenuBuilder {
	optionQueue: StringSelectMenuOptionBuilder[] = [];

	constructor(baseKey?: string) {
		this.builder = new StringBuilder();
		this.keySegment = baseKey;
	}

	addOptions(...options: RestOrArray<StringSelectMenuOptionBuilder>) {
		const normalizedOptions = normalizeArray(options);
		this.optionQueue.push(...normalizedOptions);
		return this;
	}

	setOptions(...options: RestOrArray<StringSelectMenuOptionBuilder>) {
		this.optionQueue = normalizeArray(options);
		return this;
	}

	spliceOptions(index: number, deleteCount: number, ...options: RestOrArray<StringSelectMenuOptionBuilder>) {
		options = normalizeArray(options);
		const clone = [...normalizeArray(this.optionQueue)];

		clone.splice(index, deleteCount, ...options);
		this.optionQueue.splice(index, deleteCount, ...clone);

		return this;
	}

	hydrateOptions(locale: LocaleString, baseKey?: string) {
		if (this.keySegment && baseKey) {
			this.builder.setOptions(
				this.optionQueue.map(option => {
					if (this.keySegment) {
						option.hydrateSelf(locale, joinKeys([baseKey, 'select_menus', this.keySegment]));
					}

					return option.builder;
				})
			);

			this.optionQueue = [];
		}

		return this;
	}
}
