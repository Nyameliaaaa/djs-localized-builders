import { EmbedBuilder as Builder, RGBTuple, RestOrArray, normalizeArray } from '@discordjs/builders';
import { APIEmbedField } from 'discord-api-types/v10';
import { getConfig, getString, joinKeys } from 'lib';
import { BuilderMixin, LocaleBaseKeyMixin } from 'mixins';
import { mix } from 'ts-mixer';
import {
    LocaleAuthorWithKey,
    LocaleAuthorWithoutKey,
    LocaleFieldOptions,
    LocaleFooterWithKey,
    LocaleFooterWithoutKey,
    localeAuthorWithKey,
    localeAuthorWithoutKey,
    localeFooterWithKey
} from 'types';

export interface EmbedBuilder extends BuilderMixin<Builder>, LocaleBaseKeyMixin {}

@mix(LocaleBaseKeyMixin, BuilderMixin)
export class EmbedBuilder {
    constructor(locale: string, baseKey?: string) {
        this.locale = locale;
        this.baseKey = baseKey;
    }

    protected init(locale: string, baseKey?: string) {
        const config = getConfig();
        config.onCreateEmbed(this, locale);
    }

    protected mapField(field: LocaleFieldOptions) {
        const returnField: APIEmbedField = { inline: field.inline, name: '', value: '' };

        if ((field.name ?? field.value) && this.baseKey) {
            throw new TypeError('Cannot have a full-key value or name along with a dynamic/base key.');
        }

        // if we have a raw field name or value key
        if ((field.name ?? field.value) && !this.baseKey) {
            if (field.name) {
                returnField.name = getString(field.name, this.locale, 'embeds', field.nameArgs);
            }

            if (field.value) {
                returnField.value = getString(field.value, this.locale, 'embeds', field.valueArgs);
            }
        }

        // if we have a basekey
        if (this.baseKey && field.key) {
            if (!field.rawName) {
                returnField.name = getString(
                    joinKeys([this.baseKey, 'fields', field.key, 'name']),
                    this.locale,
                    'embeds',
                    field.nameArgs
                );
            }

            if (!field.rawValue) {
                returnField.value = getString(
                    joinKeys([this.baseKey, 'fields', field.key, 'value']),
                    this.locale,
                    'embeds',
                    field.valueArgs
                );
            }
        }

        // if its raw
        if (field.rawName) {
            returnField.name = field.rawName;
        }

        if (field.rawValue) {
            returnField.value = field.rawValue;
        }

        return returnField;
    }

    addFields(fields: RestOrArray<LocaleFieldOptions>) {
        this.builder.addFields(normalizeArray(fields).map(field => this.mapField(field)));
        return this;
    }

    setAuthor({ iconURL, url, nameArgs, ...author }: LocaleAuthorWithKey | LocaleAuthorWithoutKey) {
        const forCheck = { ...author, url, iconURL, nameArgs };
        const withKey = localeAuthorWithKey(forCheck);
        const withoutKey = localeAuthorWithoutKey(forCheck);
        let name = '';

        if (withoutKey.problems && withKey.problems) {
            throw new TypeError('Provided author is not a valid author object.', {
                cause: {
                    validationsForKeyBased: withKey.problems,
                    validationsForKeyless: withoutKey.problems
                }
            });
        }

        if (this.baseKey && withKey.data && withoutKey.problems) {
            throw new TypeError('Cannot have a key-based author object without an initalized embed key.');
        }

        if (withKey.problems && withoutKey.data) {
            if (withoutKey.data.rawName && withoutKey.data.name) {
                throw new TypeError('Cannot have both a raw name and a key name in an author.');
            } else if (withoutKey.data.rawName && withoutKey.data.nameArgs) {
                throw new TypeError('Cannot have name arguments on a raw name.');
            }

            name = withoutKey.data.rawName ?? getString(withoutKey.data.name ?? '', this.locale, 'embeds', nameArgs);
        }

        if (this.baseKey && withoutKey.data && withKey.data) {
            name = getString(joinKeys([this.baseKey, 'author', 'name']), this.locale, 'embeds', nameArgs);
        }

        this.builder.setAuthor({ name, url, iconURL });
        return this;
    }

    setColor(color: RGBTuple | number | null) {
        this.builder.setColor(color);
        return this;
    }

    setDescription(description: string, args?: Record<string, any>): this;
    setDescription(args: Record<string, any>): this;
    setDescription(): this;
    setDescription(descriptionOrArgs?: string | Record<string, any>, args: Record<string, any> = {}) {
        let desc = '';
        if (this.baseKey && typeof descriptionOrArgs === 'object') {
            desc = getString(joinKeys([this.baseKey, 'description']), this.locale, 'embeds', descriptionOrArgs);
        }

        if (this.baseKey && !descriptionOrArgs) {
            desc = getString(joinKeys([this.baseKey, 'description']), this.locale, 'embeds');
        }

        if (typeof descriptionOrArgs === 'string') {
            desc = getString(descriptionOrArgs, this.locale, 'embeds', args);
        }

        this.builder.setDescription(desc);
        return this;
    }

    setFooter({ textArgs, iconURL, ...footer }: LocaleFooterWithoutKey | LocaleFooterWithKey) {
        const forCheck = { ...footer, iconURL, textArgs };
        const withKey = localeFooterWithKey(forCheck);
        const withoutKey = localeAuthorWithoutKey(forCheck);
        let text = '';

        if (withoutKey.problems && withKey.problems) {
            throw new TypeError('Provided footer is not a valid footer object.', {
                cause: {
                    validationsForKeyBased: withKey.problems,
                    validationsForKeyless: withoutKey.problems
                }
            });
        }

        if (this.baseKey && withKey.data && withoutKey.problems) {
            throw new TypeError('Cannot have a key-based footer object without an initalized embed key.');
        }

        if (withKey.problems && withoutKey.data) {
            if (withoutKey.data.rawName && withoutKey.data.name) {
                throw new TypeError('Cannot have both a raw text and a key text in a footer.');
            } else if (withoutKey.data.rawName && withoutKey.data.nameArgs) {
                throw new TypeError('Cannot have text arguments on a raw text in a footer.');
            }

            text = withoutKey.data.rawName ?? getString(withoutKey.data.name ?? '', this.locale, 'embeds', textArgs);
        }

        if (this.baseKey && withoutKey.data && withKey.data) {
            text = getString(joinKeys([this.baseKey, 'footer', 'text']), this.locale, 'embeds', textArgs);
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

    setTitle(title: string, args?: Record<string, any>): this;
    setTitle(args: Record<string, any>): this;
    setTitle(): this;
    setTitle(titleOrArgs?: string | Record<string, any>, args: Record<string, any> = {}) {
        let title = '';
        if (this.baseKey && typeof titleOrArgs === 'object') {
            title = getString(joinKeys([this.baseKey, 'title']), this.locale, 'embeds', titleOrArgs);
        }

        if (this.baseKey && !titleOrArgs) {
            title = getString(joinKeys([this.baseKey, 'title']), this.locale, 'embeds');
        }

        if (typeof titleOrArgs === 'string') {
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
