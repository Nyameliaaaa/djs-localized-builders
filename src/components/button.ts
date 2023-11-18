import { ButtonBuilder as Builder } from '@discordjs/builders';
import type { APIMessageComponentEmoji, ButtonStyle, LocalizationMap } from 'discord-api-types/v10';
import { ArgsWithRawOrKeyedParam, getString, joinKeys } from 'index';
import { BaseKeyMixin, BuilderMixin } from 'mixins';
import { mix } from 'ts-mixer';

export interface ButtonBuilder extends BuilderMixin<Builder>, BaseKeyMixin {}

@mix(BuilderMixin, BaseKeyMixin)
export class ButtonBuilder {
    args: Record<string, any>;
    private localizedLabelNotFromKeyInitialValue = '';
    private shouldSetLabelFromParentBaseKey = false;

    constructor(baseKey?: string) {
        this.builder = new Builder();
        this.args = {};
    }

    setLabel(label: string, args?: ArgsWithRawOrKeyedParam): this;
    setLabel(args: Record<string, any>): this;
    setLabel(): this;
    setLabel(labelOrArgs?: string | Record<string, any>, args: ArgsWithRawOrKeyedParam = {}) {
        // if a base key is present along with args, store the args until the button is prepared for use.
        if (this.baseKey && typeof labelOrArgs === 'object') {
            this.shouldSetLabelFromParentBaseKey = true;
            this.args = labelOrArgs;
        }

        // if a base key is present with no args (ie setLabel()) then we should store that info so that the parent base key is used.
        if (this.baseKey && !labelOrArgs) {
            this.shouldSetLabelFromParentBaseKey = true;
        }

        if (typeof labelOrArgs === 'string') {
            // if the first argument is a string expliclitly marked as a raw value we should set it directly
            if (args.raw) {
                this.builder.setLabel(labelOrArgs);
                // if it IS NOT marked as a raw value then we store the key for the label and its arguments
            }

            if (args.localizedString) {
                this.localizedLabelNotFromKeyInitialValue = labelOrArgs;
                this.args = args;
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

    hydrateSelf(locale: keyof LocalizationMap, baseKey?: string) {
        // if the parent base key AND the base key are present, and the label source is from the action row
        if (this.baseKey && baseKey && this.shouldSetLabelFromParentBaseKey) {
            this.builder.setLabel(
                getString(joinKeys([baseKey, 'buttons', this.baseKey, 'label']), locale, 'components', this.args)
            );
        }

        // if the label source is a non parent key, we should use that
        if (this.localizedLabelNotFromKeyInitialValue) {
            this.builder.setLabel(
                getString(this.localizedLabelNotFromKeyInitialValue, locale, 'components', this.args)
            );
        }

        return this;
    }
}
