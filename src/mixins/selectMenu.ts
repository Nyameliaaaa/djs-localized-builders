import { isValidationEnabled } from '@discordjs/builders';
import type { LocalizationMap } from 'discord-api-types/v10';
import { ArgsWithRawOrKeyedParam, SelectMenuResolvable, StringSelectMenuBuilder, getString, joinKeys } from 'index';
import { BaseKeyMixin, BuilderMixin } from 'mixins';
import { hasMixin, mix } from 'ts-mixer';

export interface SelectMenuMixin<Builder extends SelectMenuResolvable> extends BuilderMixin<Builder>, BaseKeyMixin {}

@mix(BuilderMixin, BaseKeyMixin)
export class SelectMenuMixin<Builder extends SelectMenuResolvable> {
    placeholderArgs: Record<string, any> = {};
    private nonBaseKeyplaceholderLocaleString = '';
    private placeholderRequiresParentBaseKeyHydration = false;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(baseKey?: string) {}

    setPlaceholder(placeholder: string, args?: ArgsWithRawOrKeyedParam): this;
    setPlaceholder(args: Record<string, any>): this;
    setPlaceholder(): this;
    setPlaceholder(placeholderOrArgs?: string | Record<string, any>, args: ArgsWithRawOrKeyedParam = {}) {
        /** ====================================================================================
         *   HOW VALID STATES ARE HANDLED
         * =====================================================================================
         * * setPlaceholder()
         * mark this placeholder as requiring hydration from a parent baseKey
         *
         * * setPlaceholder({ foo: 'bar' })
         * use the parent baseKey with an argument to be passed to the final string
         *
         * * setPlaceholder('foo bar', { raw: true })
         * pass placeholder as is
         *
         * * setPlaceholder('foo.bar', { localized: true })
         * placeholder is localized but does not use a baseKey
         *
         * * setPlaceholder('foo.bar', { localized: true, baz: 'faz' })
         * placeholder is localized but does not use a baseKey, and takes an argument to be passed
         *
         * =====================================================================================
         *   INVALID STATES
         * =====================================================================================
         * * setPlaceholder()
         * if a baseKey does not exist
         *
         * * setPlaceholder('foo bar', { localized: true, raw: true })
         * a string cannot be both localized and raw
         * =====================================================================================
         */

        if (isValidationEnabled()) {
            if (!this.baseKey && (!placeholderOrArgs || typeof placeholderOrArgs === 'object')) {
                throw TypeError('Missing baseKey or string value!');
            }

            if (typeof placeholderOrArgs === 'string' && args.localized && args.raw) {
                throw TypeError('Cannot be raw and localized at once.', { cause: placeholderOrArgs });
            }
        }

        if (this.baseKey && !(typeof placeholderOrArgs === 'string')) {
            this.placeholderRequiresParentBaseKeyHydration = true;

            if (typeof placeholderOrArgs === 'object') {
                this.placeholderArgs = placeholderOrArgs;
            }
        }

        if (typeof placeholderOrArgs === 'string') {
            // case 3
            if (args.raw) {
                this.builder.setPlaceholder(placeholderOrArgs);
            }

            if (args.localized) {
                this.nonBaseKeyplaceholderLocaleString = placeholderOrArgs;
                this.placeholderArgs = args;
            }
        }
        return this;
    }

    setDisabled(disabled = true) {
        this.builder.setDisabled(disabled);
        return this;
    }

    setCustomId(customId: string) {
        this.builder.setCustomId(customId);
        return this;
    }

    setMinValues(value: number) {
        this.builder.setMinValues(value);
        return this;
    }

    setMaxValues(value: number) {
        this.builder.setMaxValues(value);
        return this;
    }

    hydrateSelf(locale: keyof LocalizationMap, parentBaseKey?: string) {
        // case 1, 2
        if (this.baseKey && parentBaseKey && this.placeholderRequiresParentBaseKeyHydration) {
            this.builder.setPlaceholder(
                getString(
                    joinKeys([parentBaseKey, 'options', this.baseKey, 'label']),
                    locale,
                    'components',
                    this.placeholderArgs
                )
            );
        }

        // case 4, 5
        if (this.nonBaseKeyplaceholderLocaleString) {
            this.builder.setPlaceholder(
                getString(this.nonBaseKeyplaceholderLocaleString, locale, 'components', this.placeholderArgs)
            );
        }

        if (hasMixin(this, StringSelectMenuBuilder)) {
            this.hydrateOptions(locale, parentBaseKey);
        }

        return this;
    }

    get minValue() {
        return this.builder.data.min_values;
    }

    get maxValue() {
        return this.builder.data.max_values;
    }
}
