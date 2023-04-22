import { EmbedBuilder as Builder, RGBTuple, RestOrArray, normalizeArray } from '@discordjs/builders';
import { APIEmbedField } from 'discord-api-types/v10';
import { getConfig, getString, joinKeys } from 'lib';
import { BuilderMixin, LocaleBaseKeyMixin } from 'mixins';
import { mix } from 'ts-mixer';
import {
    ArgsWithRawParam,
    LocaleAuthor,
    LocaleFieldOptions,
    LocaleFooterWithKey,
    LocaleFooterWithoutKey,
    localeFieldOptions,
    localeFooterWithKey,
    localeFooterWithoutKey
} from 'types';

export interface EmbedBuilder extends BuilderMixin<Builder>, LocaleBaseKeyMixin {}

@mix(LocaleBaseKeyMixin, BuilderMixin)
export class EmbedBuilder {
    constructor(locale: string, baseKey?: string) {
        this.builder = new Builder();
        this.locale = locale;
        this.baseKey = baseKey;
    }

    protected init(locale: string, baseKey?: string) {
        const config = getConfig();
        config.onCreateEmbed(this, locale);
    }

    protected mapField(field: LocaleFieldOptions) {
        const returnField: APIEmbedField = { inline: field.inline, name: '', value: '' };
        const { data, problems } = localeFieldOptions(field);

        if (Object.keys(field).length === 0) {
            throw new TypeError('Embed field cannot be empty');
        }

        if (problems) {
            throw new TypeError('Invalid embed field.', { cause: problems.summary });
        }

        // we cannot have both a key ref and a raw value, as that would cause an override
        if ((data.name && data.rawName) ?? (data.value && data.rawName)) {
            throw new TypeError('Cannot have a key reference name/value and a raw name/value', { cause: field });
        }

        // we cannot have both a field basekey and an opt key ref
        if (data.key && (data.name ?? data.value)) {
            throw new TypeError('Cannot have a field base key and a key reference name/value.', { cause: field });
        }

        // we cannot have both a raw opt and opt args
        if ((data.rawName && data.nameArgs) ?? (data.rawValue && data.valueArgs)) {
            throw new TypeError('Cannot have a field raw name/value and name/value string arguments', { cause: field });
        }

        // if we have a name or value ref key
        if (data.name ?? data.value) {
            if (data.name) {
                returnField.name = getString(data.name, this.locale, 'embeds', data.nameArgs);
            }

            if (data.value) {
                returnField.value = getString(data.value, this.locale, 'embeds', data.valueArgs);
            }
        }

        // basekey (overrides manual key ref)
        if (this.baseKey && data.key) {
            if (!data.rawName) {
                returnField.name = getString(
                    joinKeys([this.baseKey, 'fields', data.key, 'name']),
                    this.locale,
                    'embeds',
                    data.nameArgs
                );
            }

            if (!data.rawValue) {
                returnField.value = getString(
                    joinKeys([this.baseKey, 'fields', data.key, 'value']),
                    this.locale,
                    'embeds',
                    data.valueArgs
                );
            }
        }

        // handle raw opts (override manual key ref and basekey)
        if (data.rawName) {
            returnField.name = data.rawName;
        }

        if (data.rawValue) {
            returnField.value = data.rawValue;
        }

        return returnField;
    }

    addFields(fields: RestOrArray<LocaleFieldOptions>) {
        this.builder.addFields(normalizeArray(fields).map(field => this.mapField(field)));
        return this;
    }

    setAuthor(author: LocaleAuthor = {}) {
        let name = '';

        if (!(author.name ?? author.rawName) && !this.baseKey) {
            throw new TypeError(
                'You must provide either a key ref or raw value as a name when no embed base key is defined',
                { cause: author }
            );
        }

        if (((!author.name ?? !author.rawName) && this.baseKey) ?? (Object.keys(author).length === 0 && this.baseKey)) {
            name = getString(joinKeys([this.baseKey, 'author', 'name']), this.locale, 'embeds', author.nameArgs);
        }

        if (author.name ?? author.rawName) {
            if (author.rawName && author.name) {
                throw new TypeError('Cannot have both a raw name and a key name in an author.');
            } else if (author.rawName && author.nameArgs) {
                throw new TypeError('Cannot have name arguments on a raw name.');
            }

            name = author.rawName ?? getString(author.name ?? '', this.locale, 'embeds', author.nameArgs);
        }

        this.builder.setAuthor({ name, url: author.url, iconURL: author.iconURL });
        return this;
    }

    setColor(color: RGBTuple | number | null) {
        this.builder.setColor(color);
        return this;
    }

    setDescription(description: string, args?: ArgsWithRawParam): this;
    setDescription(args: Record<string, any>): this;
    setDescription(): this;
    setDescription(descriptionOrArgs?: string | Record<string, any>, args: ArgsWithRawParam = {}) {
        let desc = '';

        if (this.baseKey && typeof descriptionOrArgs === 'object') {
            desc = getString(joinKeys([this.baseKey, 'description']), this.locale, 'embeds', descriptionOrArgs);
        }

        if (this.baseKey && !descriptionOrArgs) {
            desc = getString(joinKeys([this.baseKey, 'description']), this.locale, 'embeds');
        }

        if (typeof descriptionOrArgs === 'string') {
            if (args.raw) {
                desc = descriptionOrArgs;
            } else {
                desc = getString(descriptionOrArgs, this.locale, 'embeds', args);
            }
        }

        this.builder.setDescription(desc);
        return this;
    }

    setFooter({ textArgs, iconURL, ...footer }: LocaleFooterWithoutKey | LocaleFooterWithKey) {
        let text = '';
        const forCheck = { ...footer, iconURL: iconURL ?? '', textArgs: textArgs ?? {} };

        if (this.baseKey) {
            const { data, problems } = localeFooterWithKey(forCheck);

            if (problems) {
                throw new TypeError('Provided footer is not a valid footer object.', {
                    cause: problems.summary
                });
            }

            text = getString(joinKeys([this.baseKey, 'footer', 'text']), this.locale, 'embeds', data.textArgs);
        }

        if (!this.baseKey) {
            const { data, problems } = localeFooterWithoutKey(forCheck);

            if (problems) {
                throw new TypeError('Provided footer is not a valid footer object.', {
                    cause: problems.summary
                });
            }

            if (data.rawText && data.text) {
                throw new TypeError('Cannot have both a raw name and a key name in an footer.');
            } else if (data.rawText && data.textArgs) {
                throw new TypeError('Cannot have name arguments on a raw name.');
            }

            text = data.rawText ?? getString(data.rawText ?? '', this.locale, 'embeds', data.textArgs);
        }

        this.builder.setFooter({ text, iconURL });
        return this;
    }

    setImage(url: string) {
        this.builder.setImage(url);
        return this;
    }

    setThumbnail(url: string) {
        this.builder.setThumbnail(url);
        return this;
    }

    setTitle(title: string, args?: ArgsWithRawParam): this;
    setTitle(args: Record<string, any>): this;
    setTitle(): this;
    setTitle(titleOrArgs?: string | Record<string, any>, args: ArgsWithRawParam = {}) {
        let title = '';
        if (this.baseKey && typeof titleOrArgs === 'object') {
            title = getString(joinKeys([this.baseKey, 'title']), this.locale, 'embeds', titleOrArgs);
        }

        if (this.baseKey && !titleOrArgs) {
            title = getString(joinKeys([this.baseKey, 'title']), this.locale, 'embeds');
        }

        if (typeof titleOrArgs === 'string') {
            if (args.raw) {
                title = titleOrArgs;
            }
            title = getString(titleOrArgs, this.locale, 'embeds', args);
        }

        this.builder.setTitle(title);
        return this;
    }

    setURL(url: string) {
        this.builder.setURL(url);
        return this;
    }

    setTimestamp(timestamp: Date | number | null = Date.now()) {
        this.builder.setTimestamp(timestamp);
        return this;
    }

    setFields(fields: RestOrArray<LocaleFieldOptions>) {
        this.builder.setFields(normalizeArray(fields).map(field => this.mapField(field)));
        return this;
    }

    spliceFields(index: number, deleteCount: number, fields: LocaleFieldOptions[]) {
        this.builder.spliceFields(index, deleteCount, ...fields.map(field => this.mapField(field)));
        return this;
    }
}
