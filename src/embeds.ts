import { EmbedBuilder as Builder, RGBTuple, RestOrArray, normalizeArray } from '@discordjs/builders';
import { APIEmbedField } from 'discord-api-types/v10';
import { getConfig, getString, joinKeys } from 'lib';
import { BuilderMixin, LocaleBaseKeyMixin } from 'mixins';
import { mix } from 'ts-mixer';
import {
    ArgsWithRawParam,
    LocaleAuthorWithKey,
    LocaleAuthorWithoutKey,
    LocaleFieldOptions,
    LocaleFooterWithKey,
    LocaleFooterWithoutKey,
    localeAuthorWithKey,
    localeAuthorWithoutKey,
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

        if (problems) {
            throw new TypeError('Invalid embed field.', { cause: problems });
        }

        if ((data.name ?? data.value) && this.baseKey) {
            throw new TypeError('Cannot have a full-key value or name along with a dynamic/base key.');
        }

        // if we have a raw field name or value key
        if ((data.name ?? data.value) && !this.baseKey) {
            if (data.name) {
                returnField.name = getString(data.name, this.locale, 'embeds', data.nameArgs);
            }

            if (data.value) {
                returnField.value = getString(data.value, this.locale, 'embeds', data.valueArgs);
            }
        }

        // if we have a basekey
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

        // if its raw
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

    setAuthor({ iconURL, url, nameArgs, ...author }: LocaleAuthorWithKey | LocaleAuthorWithoutKey) {
        let name = '';
        const forCheck = { ...author, url: url ?? '', iconURL: iconURL ?? '', nameArgs: nameArgs ?? {} };
        const { data: withKeyData, problems: withKeyProblems } = localeAuthorWithKey(forCheck);
        const { data: withoutKeyData, problems: withoutKeyProblems } = localeAuthorWithoutKey(forCheck);

        if (withKeyProblems && withoutKeyProblems) {
            throw new TypeError('Provided author is not a valid author object.', {
                cause: [withKeyProblems.summary, withoutKeyProblems.summary]
            });
        }

        if (this.baseKey && withKeyData && withoutKeyProblems) {
            console.log('hello');
            name = getString(joinKeys([this.baseKey, 'author', 'name']), this.locale, 'embeds', withKeyData.nameArgs);
        }

        if (withoutKeyData && withKeyProblems) {
            console.log('hi');
            if (withoutKeyData.rawName && withoutKeyData.name) {
                throw new TypeError('Cannot have both a raw name and a key name in an author.');
            } else if (withoutKeyData.rawName && withoutKeyData.nameArgs) {
                throw new TypeError('Cannot have name arguments on a raw name.');
            }

            name =
                withoutKeyData.rawName ??
                getString(withoutKeyData.name ?? '', this.locale, 'embeds', withoutKeyData.nameArgs);
        }

        this.builder.setAuthor({ name, url, iconURL });
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
