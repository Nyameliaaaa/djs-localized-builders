import { EmbedBuilder as Builder, RGBTuple } from '@discordjs/builders';
import { APIEmbedField } from 'discord-api-types/v10';
import { getConfig, getString, joinKeys } from 'lib';
import { BuilderMixin, LocaleBaseKeyMixin } from 'mixins';
import { mix } from 'ts-mixer';
import { KeyLocaleAuthor, KeyLocaleFooter, LocaleFieldOptions, NonKeyLocaleAuthor, NonKeyLocaleFooter } from 'types';

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

    protected isKeyAuthor(thing: any): thing is KeyLocaleAuthor {
        return (
            ('nameArgs' in thing || 'url' in thing || 'iconURL' in thing) && !('name' in thing) && !('rawName' in thing)
        );
    }

    protected isNonKeyAuthor(thing: any): thing is NonKeyLocaleAuthor {
        return (
            ('nameArgs' in thing || 'url' in thing || 'iconURL' in thing || 'name' in thing || 'rawName' in thing) &&
            !this.isKeyAuthor(thing)
        );
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

    addFields(fields: LocaleFieldOptions[]) {
        this.builder.addFields(fields.map(field => this.mapField(field)));
        return this;
    }

    setAuthor({ iconURL, url, ...author }: KeyLocaleAuthor | NonKeyLocaleAuthor) {
        if (this.isKeyAuthor(author) && !this.baseKey) {
            throw new TypeError('Cannot have an implicit author field without an embed base key.');
        }

        let name = '';

        if (this.isKeyAuthor(author) && this.baseKey) {
            name = getString(joinKeys([this.baseKey, 'author', 'name']), this.locale, 'embeds', author.nameArgs);
        } else if (this.isNonKeyAuthor(author)) {
            name = author.rawName ?? getString(author.name ?? '', this.locale, 'embeds', author.nameArgs);
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

    // setFooter({ text, textArgs, rawText, iconURL }: LocaleFooter) {
    //     this.builder.setFooter({ text: rawText ?? this.getOne(text, this.locale, textArgs), iconURL });
    //     return this;
    // }

    setImage(url: string) {
        this.builder.setImage(url);
        return this;
    }

    setThumbnail(url: string) {
        this.builder.setThumbnail(url);
        return this;
    }

    // setTitle(title: string, args: Record<string, any> = {}): this {
    //     this.builder.setTitle(args.raw ? title : this.getOne(title, this.locale, args));
    //     return this;
    // }

    setURL(url: string) {
        this.builder.setURL(url);
        return this;
    }

    setTimestamp(timestamp: Date | number | null = Date.now()) {
        this.builder.setTimestamp(timestamp);
        return this;
    }

    setFields(fields: LocaleFieldOptions[]) {
        this.builder.setFields(fields.map(field => this.mapField(field)));
        return this;
    }

    spliceFields(index: number, deleteCount: number, fields: LocaleFieldOptions[]) {
        this.builder.spliceFields(index, deleteCount, ...fields.map(field => this.mapField(field)));
        return this;
    }
}
