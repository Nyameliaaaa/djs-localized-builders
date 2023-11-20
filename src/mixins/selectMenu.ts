import type { LocalizationMap } from 'discord-api-types/v10';
import { ArgsWithRawOrKeyedParam, SelectMenuResolvable, getString, joinKeys } from 'index';
import { BaseKeyMixin, BuilderMixin } from 'mixins';
import { mix } from 'ts-mixer';

export interface SelectMenu<Builder extends SelectMenuResolvable> extends BuilderMixin<Builder>, BaseKeyMixin {}

@mix(BuilderMixin, BaseKeyMixin)
export class SelectMenu<Builder extends SelectMenuResolvable> {
    args: Record<string, any> = {};
    private localizedPlaceholderNotFromKeyInitialValue = '';
    private shouldSetPlaceholderFromParentBaseKey = false;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(baseKey?: string) {}

    setPlaceholder(placeholder: string, args?: ArgsWithRawOrKeyedParam): this;
    setPlaceholder(args: Record<string, any>): this;
    setPlaceholder(): this;
    setPlaceholder(placeholderOrArgs?: string | Record<string, any>, args: ArgsWithRawOrKeyedParam = {}) {
        // if a base key is present with no args (ie setPlaceholder()) then we should store that info so that the parent base key is used.
        if (this.baseKey) {
            this.shouldSetPlaceholderFromParentBaseKey = true;
        }

        // if a base key is present along with args, store the args until the select menu is prepared for use.
        if (this.baseKey && typeof placeholderOrArgs === 'object') {
            this.args = placeholderOrArgs;
        }

        if (typeof placeholderOrArgs === 'string') {
            // if the first argument is a string expliclitly marked as a raw value we should set it directly
            if (args.raw) {
                this.builder.setPlaceholder(placeholderOrArgs);
            }

            // if it IS NOT marked as a raw value then we store the key for the placeholder and its arguments
            if (args.localizedString) {
                this.localizedPlaceholderNotFromKeyInitialValue = placeholderOrArgs;
                this.args = args;
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

    hydrateSelf(locale: keyof LocalizationMap, baseKey?: string) {
        // if the parent base key AND the base key are present, and the placeholder source is from the action row
        if (this.baseKey && baseKey && this.shouldSetPlaceholderFromParentBaseKey) {
            this.builder.setPlaceholder(
                getString(joinKeys([baseKey, 'selects', this.baseKey, 'placeholder']), locale, 'components', this.args)
            );
        }

        // if the placeholder source is a non parent key, we should use that
        if (this.localizedPlaceholderNotFromKeyInitialValue) {
            this.builder.setPlaceholder(
                getString(this.localizedPlaceholderNotFromKeyInitialValue, locale, 'components', this.args)
            );
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
