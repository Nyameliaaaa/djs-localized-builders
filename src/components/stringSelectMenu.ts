import {
    RestOrArray,
    StringSelectMenuBuilder as StringBuilder,
    StringSelectMenuOptionBuilder as StringOptionBuilder,
    normalizeArray
} from '@discordjs/builders';
import type { APIMessageComponentEmoji, APISelectMenuOption, LocalizationMap } from 'discord-api-types/v10';
import { ArgsWithRawOrKeyedParam, getString, joinKeys } from 'index';
import { BaseKeyMixin, BuilderMixin, SelectMenu } from 'mixins';
import { mix } from 'ts-mixer';

export interface StringSelectMenuOptionBuilder extends BuilderMixin<StringOptionBuilder>, BaseKeyMixin {
    setLabel(label: string, args?: ArgsWithRawOrKeyedParam): this;
    setLabel(args: Record<string, any>): this;
    setLabel(): this;

    setDescription(description: string, args?: ArgsWithRawOrKeyedParam): this;
    setDescription(args: Record<string, any>): this;
    setDescription(): this;
}

@mix(BuilderMixin, BaseKeyMixin)
export class StringSelectMenuOptionBuilder {
    private labelArgs: Record<string, any> = {};
    private shouldSetLabelFromParentBaseKey = false;
    private localizedLabelNotFromKeyInitialValue = '';

    private descriptionArgs: Record<string, any> = {};
    private shouldSetDescriptionFromParentBaseKey = false;
    private localizedDescriptionNotFromKeyInitialValue = '';

    constructor(baseKey?: string) {
        this.builder = new StringOptionBuilder();
    }

    setLabel(labelOrArgs?: string | Record<string, any>, args: ArgsWithRawOrKeyedParam = {}) {
        // if a base key is present with no args (ie setLabel()) then we should store that info so that the parent base key is used.
        if (this.baseKey) {
            this.shouldSetLabelFromParentBaseKey = true;
        }

        // if a base key is present along with args, store the args until the select menu option is prepared for use.
        if (this.baseKey && typeof labelOrArgs === 'object') {
            this.labelArgs = labelOrArgs;
        }

        if (typeof labelOrArgs === 'string') {
            // if the first argument is a string expliclitly marked as a raw value we should set it directly
            if (args.raw) {
                this.builder.setLabel(labelOrArgs);
            }

            // if it IS NOT marked as a raw value then we store the key for the label and its arguments
            if (args.localizedString) {
                this.localizedLabelNotFromKeyInitialValue = labelOrArgs;
                this.labelArgs = args;
            }
        }

        return this;
    }

    setDescription(descriptionOrArgs?: string | Record<string, any>, args: ArgsWithRawOrKeyedParam = {}) {
        // if a base key is present with no args (ie setLabel()) then we should store that info so that the parent base key is used.
        if (this.baseKey) {
            this.shouldSetDescriptionFromParentBaseKey = true;
        }

        // if a base key is present along with args, store the args until the select menu option is prepared for use.
        if (this.baseKey && typeof descriptionOrArgs === 'object') {
            this.descriptionArgs = descriptionOrArgs;
        }

        if (typeof descriptionOrArgs === 'string') {
            // if the first argument is a string expliclitly marked as a raw value we should set it directly
            if (args.raw) {
                this.builder.setDescription(descriptionOrArgs);
            }

            // if it IS NOT marked as a raw value then we store the key for the label and its arguments
            if (args.localizedString) {
                this.localizedDescriptionNotFromKeyInitialValue = descriptionOrArgs;
                this.descriptionArgs = args;
            }
        }

        return this;
    }

    setDefault(isDefault = true) {
        this.builder.setDefault(isDefault);
        return this;
    }

    setValue(value: string) {
        this.builder.setValue(value);
        return this;
    }

    setEmoji(emoji: APIMessageComponentEmoji) {
        this.builder.setEmoji(emoji);
        return this;
    }

    hydrateSelf(locale: keyof LocalizationMap, baseKey?: string) {
        // if there is no call to setValue() then we use the base key as the value
        if (!this.builder.data.value && this.baseKey) {
            this.builder.setValue(this.baseKey);
        }

        // if the parent base key AND the base key are present, and the label source is from the action row
        if (this.baseKey && baseKey && this.shouldSetLabelFromParentBaseKey) {
            this.builder.setLabel(
                getString(joinKeys([baseKey, 'options', this.baseKey, 'label']), locale, 'components', this.labelArgs)
            );
        }

        // if the label source is a non parent key, we should use that
        if (this.localizedLabelNotFromKeyInitialValue) {
            this.builder.setLabel(
                getString(this.localizedLabelNotFromKeyInitialValue, locale, 'components', this.labelArgs)
            );
        }

        // if the parent base key AND the base key are present, and the description source is from the action row
        if (this.baseKey && baseKey && this.shouldSetDescriptionFromParentBaseKey) {
            this.builder.setDescription(
                getString(
                    joinKeys([baseKey, 'options', this.baseKey, 'description']),
                    locale,
                    'components',
                    this.descriptionArgs
                )
            );
        }

        // if the description source is a non parent key, we should use that
        if (this.localizedDescriptionNotFromKeyInitialValue) {
            this.builder.setDescription(
                getString(this.localizedDescriptionNotFromKeyInitialValue, locale, 'components', this.descriptionArgs)
            );
        }

        return this;
    }

    get data(): Partial<APISelectMenuOption> {
        return this.builder.data;
    }
}

export interface StringSelectMenuBuilder extends BuilderMixin<StringBuilder>, BaseKeyMixin, SelectMenu<StringBuilder> {}

@mix(BuilderMixin, BaseKeyMixin, SelectMenu)
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
                        return option.hydrateSelf(locale, joinKeys([baseKey, 'selects', this.baseKey])).builder;
                    }

                    return option.builder;
                })
            );

            this.optionQueue = [];
        }

        return this;
    }
}
