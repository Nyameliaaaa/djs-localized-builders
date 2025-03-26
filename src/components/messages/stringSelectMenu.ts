import { RestOrArray, StringSelectMenuBuilder as StringBuilder, normalizeArray } from '@discordjs/builders';
import { StringSelectMenuOptionBuilder } from 'components';
import type { LocalizationMap } from 'discord-api-types/v10';
import { joinKeys } from 'lib';
import { BaseKeyMixin, BuilderMixin, SelectMenuMixin } from 'mixins';
import { mix } from 'ts-mixer';

export interface StringSelectMenuBuilder
    extends BuilderMixin<StringBuilder>,
        BaseKeyMixin,
        SelectMenuMixin<StringBuilder> {}

@mix(BuilderMixin, BaseKeyMixin, SelectMenuMixin)
export class StringSelectMenuBuilder {
    optionQueue: StringSelectMenuOptionBuilder[] = [];

    constructor(baseKey?: string) {
        this.builder = new StringBuilder();
        this.baseKey = baseKey;
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

    hydrateOptions(locale: keyof LocalizationMap, baseKey?: string) {
        if (this.baseKey && baseKey) {
            this.builder.setOptions(
                this.optionQueue.map(option => {
                    if (this.baseKey) {
                        option.hydrateSelf(locale, joinKeys([baseKey, 'select_menus', this.baseKey]));
                    }

                    return option.builder;
                })
            );

            this.optionQueue = [];
        }

        return this;
    }
}
