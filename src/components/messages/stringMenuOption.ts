import { isValidationEnabled, StringSelectMenuOptionBuilder as StringOptionBuilder } from '@discordjs/builders';
import { APIMessageComponentEmoji, LocalizationMap, APISelectMenuOption } from 'discord-api-types/v10';
import { getString, joinKeys } from 'index';
import { BuilderMixin, BaseKeyMixin } from 'mixins';
import { mix } from 'ts-mixer';
import { ArgsWithRawOrKeyedParam } from 'types';

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
    private labelRequiresParentBaseKeyHydration = false;
    private nonBaseKeyLabelLocaleString = '';

    private descArgs: Record<string, any> = {};
    private descRequiresParentBaseKeyHydration = false;
    private nonBaseKeyDescLocaleString = '';

    constructor(baseKey?: string) {
        this.builder = new StringOptionBuilder();
    }

    setLabel(labelOrArgs?: string | Record<string, any>, args: ArgsWithRawOrKeyedParam = {}) {
        /** ====================================================================================
         *   HOW VALID STATES ARE HANDLED
         * =====================================================================================
         * * setLabel()
         * mark this label as requiring hydration from a parent baseKey
         *
         * * setLabel({ foo: 'bar' })
         * use the parent baseKey with an argument to be passed to the final string
         *
         * * setLabel('foo bar', { raw: true })
         * pass label as is
         *
         * * setLabel('foo.bar', { localized: true })
         * label is localized but does not use a baseKey
         *
         * * setLabel('foo.bar', { localized: true, baz: 'faz' })
         * label is localized but does not use a baseKey, and takes an argument to be passed
         *
         * =====================================================================================
         *   INVALID STATES
         * =====================================================================================
         * * setLabel()
         * if a baseKey does not exist
         *
         * * setLabel('foo bar', { localized: true, raw: true })
         * a string cannot be both localized and raw
         * =====================================================================================
         */

        if (isValidationEnabled()) {
            if (!this.baseKey && (!labelOrArgs || typeof labelOrArgs === 'object')) {
                throw TypeError('Missing baseKey or string value!');
            }

            if (typeof labelOrArgs === 'string' && args.localized && args.raw) {
                throw TypeError('Cannot be raw and localized at once.', { cause: labelOrArgs });
            }
        }

        if (this.baseKey && !(typeof labelOrArgs === 'string')) {
            this.labelRequiresParentBaseKeyHydration = true;

            if (typeof labelOrArgs === 'object') {
                this.labelArgs = labelOrArgs;
            }
        }

        if (typeof labelOrArgs === 'string') {
            // case 3
            if (args.raw) {
                this.builder.setLabel(labelOrArgs);
            }

            if (args.localized) {
                this.nonBaseKeyLabelLocaleString = labelOrArgs;
                this.labelArgs = args;
            }
        }

        return this;
    }

    setDescription(descriptionOrArgs?: string | Record<string, any>, args: ArgsWithRawOrKeyedParam = {}) {
        /** ====================================================================================
         *   HOW VALID STATES ARE HANDLED
         * =====================================================================================
         * * setDescription()
         * mark this description as requiring hydration from a parent baseKey
         *
         * * setDescription({ foo: 'bar' })
         * use the parent baseKey with an argument to be passed to the final string
         *
         * * setDescription('foo bar', { raw: true })
         * pass description as is
         *
         * * setDescription('foo.bar', { localized: true })
         * description is localized but does not use a baseKey
         *
         * * setDescription('foo.bar', { localized: true, baz: 'faz' })
         * description is localized but does not use a baseKey, and takes an argument to be passed
         *
         * =====================================================================================
         *   INVALID STATES
         * =====================================================================================
         * * setDescription()
         * if a baseKey does not exist
         *
         * * setDescription('foo bar', { localized: true, raw: true })
         * a string cannot be both localized and raw
         * =====================================================================================
         */

        if (isValidationEnabled()) {
            if (!this.baseKey && (!descriptionOrArgs || typeof descriptionOrArgs === 'object')) {
                throw TypeError('Missing baseKey or string value!');
            }

            if (typeof descriptionOrArgs === 'string' && args.localized && args.raw) {
                throw TypeError('Cannot be raw and localized at once.', { cause: descriptionOrArgs });
            }
        }

        if (this.baseKey && !(typeof descriptionOrArgs === 'string')) {
            this.descRequiresParentBaseKeyHydration = true;

            if (typeof descriptionOrArgs === 'object') {
                this.descArgs = descriptionOrArgs;
            }
        }

        if (typeof descriptionOrArgs === 'string') {
            // case 3
            if (args.raw) {
                this.builder.setLabel(descriptionOrArgs);
            }

            if (args.localized) {
                this.nonBaseKeyDescLocaleString = descriptionOrArgs;
                this.descArgs = args;
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

    hydrateSelf(locale: keyof LocalizationMap, parentBaseKey?: string) {
        // if there is no call to setValue() then we use the base key as the value
        if (!this.builder.data.value && this.baseKey) {
            console.log('hi');
            this.builder.setValue(this.baseKey);
        }

        // SECTION - Label

        // case 1, 2
        if (this.baseKey && parentBaseKey && this.labelRequiresParentBaseKeyHydration) {
            this.builder.setLabel(
                getString(
                    joinKeys([parentBaseKey, 'options', this.baseKey, 'label']),
                    locale,
                    'components',
                    this.labelArgs
                )
            );
        }

        // case 4, 5
        if (this.nonBaseKeyLabelLocaleString) {
            this.builder.setLabel(getString(this.nonBaseKeyLabelLocaleString, locale, 'components', this.labelArgs));
        }

        // !SECTION

        // SECTION - Description

        // case 1, 2
        if (this.baseKey && parentBaseKey && this.descRequiresParentBaseKeyHydration) {
            this.builder.setDescription(
                getString(
                    joinKeys([parentBaseKey, 'options', this.baseKey, 'description']),
                    locale,
                    'components',
                    this.descArgs
                )
            );
        }

        // case 4, 5
        if (this.nonBaseKeyDescLocaleString) {
            this.builder.setDescription(
                getString(this.nonBaseKeyDescLocaleString, locale, 'components', this.descArgs)
            );
        }

        // !SECTION

        return this;
    }

    get data(): Partial<APISelectMenuOption> {
        return this.builder.data;
    }
}
