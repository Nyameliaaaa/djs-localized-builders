import { ButtonBuilder as Builder, isValidationEnabled } from '@discordjs/builders';
import type { APIMessageComponentEmoji, ButtonStyle, LocalizationMap } from 'discord-api-types/v10';
import { ArgsWithRawOrKeyedParam, getString, joinKeys } from '../../index';
import { BaseKeyMixin, BuilderMixin } from 'mixins';
import { mix } from 'ts-mixer';

export interface ButtonBuilder extends BuilderMixin<Builder>, BaseKeyMixin {}

@mix(BuilderMixin, BaseKeyMixin)
export class ButtonBuilder {
    labelArgs: Record<string, any>;
    private nonBaseKeyLabelLocaleString = '';
    private labelRequiresParentBaseKeyHydration = false;

    constructor(baseKey?: string) {
        this.builder = new Builder();
        this.labelArgs = {};
    }

    setLabel(label: string, args?: ArgsWithRawOrKeyedParam): this;
    setLabel(args: Record<string, any>): this;
    setLabel(): this;
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

    setEmoji(emoji: APIMessageComponentEmoji) {
        this.builder.setEmoji(emoji);
        return this;
    }

    setStyle(style: ButtonStyle) {
        this.builder.setStyle(style);
        return this;
    }

    setURL(url: string) {
        this.builder.setURL(url);
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

    hydrateSelf(locale: keyof LocalizationMap, parentBaseKey?: string) {
        if (this.baseKey && parentBaseKey && this.labelRequiresParentBaseKeyHydration) {
            this.builder.setLabel(
                getString(
                    joinKeys([parentBaseKey, 'buttons', this.baseKey, 'label']),
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

        return this;
    }
}
