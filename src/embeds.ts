import { EmbedBuilder as Builder, isValidationEnabled, normalizeArray, RestOrArray, RGBTuple } from '@discordjs/builders';
import { APIEmbedField } from 'discord-api-types/v10';
import { mix } from 'ts-mixer';
import { getConfig, joinKeys, resolveString } from '$lib';
import { BuilderMixin, LocaleKeySegmentMixin } from '$mixins';
import { ArgsWithRawParam, LocaleAuthor, LocaleFieldOptions, LocaleFooter, LocaleObject, LocaleParam, LocaleString } from '$types';

export interface EmbedBuilder extends BuilderMixin<Builder>, LocaleKeySegmentMixin {}

/**
 * @group Embeds
 */
@mix(LocaleKeySegmentMixin, BuilderMixin)
export class EmbedBuilder {
	constructor(locale: LocaleParam, keySegment?: string) {
		this.builder = new Builder();
	}

	protected init(locale: LocaleParam, keySegment?: string) {
		const localeValue = typeof locale === 'string' ? locale : locale.locale;
		getConfig().onCreateEmbed(this, localeValue, keySegment);
	}

	protected mapField(field: LocaleFieldOptions) {
		const returnField: APIEmbedField = { inline: field.inline, name: '', value: '' };

		if (isValidationEnabled()) {
			const isEmpty = Object.keys(field).length === 0;
			const hasRawAndRefName = field.nameRef && field.name;
			const hasRawAndRefValue = field.valueRef && field.value;
			const hasRefs = field.nameRef ?? field.valueRef;
			const hasRefsAndKey = field.key && hasRefs;
			const hasRawNameAndArgs = field.name && field.nameArgs;
			const hasRawValueAndArgs = field.value && field.valueArgs;

			if (isEmpty) {
				throw new TypeError('Embed field cannot be empty', { cause: this });
			}

			if (hasRawAndRefName || hasRawAndRefValue) {
				throw new TypeError('Cannot have a locale reference name/value and a raw name/value', { cause: field });
			}

			if (hasRefsAndKey) {
				throw new TypeError('Cannot have a field keySegment and a locale reference name/value.', { cause: field });
			}

			if (hasRawNameAndArgs || hasRawValueAndArgs) {
				throw new TypeError('Cannot have a raw name/value and locale reference name/value arguments', {
					cause: field
				});
			}
		}

		// if we have a name or value ref key
		if (field.nameRef) {
			returnField.name = resolveString(field.nameRef, this.locale, 'embeds', field.nameArgs);
		}

		if (field.valueRef) {
			returnField.value = resolveString(field.valueRef, this.locale, 'embeds', field.valueArgs);
		}

		// key segment (overrides manual key ref)
		if (this.keySegment && field.key) {
			if (!field.name) {
				returnField.name = resolveString(joinKeys([this.keySegment, 'fields', field.key, 'name']), this.locale, 'embeds', field.nameArgs);
			}

			if (!field.value) {
				returnField.value = resolveString(joinKeys([this.keySegment, 'fields', field.key, 'value']), this.locale, 'embeds', field.valueArgs);
			}
		}

		// handle raw opts (override manual key ref and key segment)
		if (field.name) {
			returnField.name = field.name;
		}

		if (field.value) {
			returnField.value = field.value;
		}

		return returnField;
	}

	setTitle(title: string, args?: ArgsWithRawParam): this;
	setTitle(args: Record<string, unknown>): this;
	setTitle(): this;
	setTitle(titleOrArgs?: string | Record<string, unknown>, args: ArgsWithRawParam = {}) {
		let title = '';
		if (this.keySegment && typeof titleOrArgs === 'object') {
			title = resolveString(joinKeys([this.keySegment, 'title']), this.locale, 'embeds', titleOrArgs);
		}

		if (this.keySegment && !titleOrArgs) {
			title = resolveString(joinKeys([this.keySegment, 'title']), this.locale, 'embeds');
		}

		if (typeof titleOrArgs === 'string') {
			if (args.raw) {
				title = titleOrArgs;
			} else {
				title = resolveString(titleOrArgs, this.locale, 'embeds', args);
			}
		}

		this.builder.setTitle(title);
		return this;
	}

	setDescription(description: string, args?: ArgsWithRawParam): this;
	setDescription(args: Record<string, unknown>): this;
	setDescription(): this;
	setDescription(descriptionOrArgs?: string | Record<string, unknown>, args: ArgsWithRawParam = {}) {
		let desc = '';

		if (this.keySegment && typeof descriptionOrArgs === 'object') {
			desc = resolveString(joinKeys([this.keySegment, 'description']), this.locale, 'embeds', descriptionOrArgs);
		}

		if (this.keySegment && !descriptionOrArgs) {
			desc = resolveString(joinKeys([this.keySegment, 'description']), this.locale, 'embeds');
		}

		if (typeof descriptionOrArgs === 'string') {
			if (args.raw) {
				desc = descriptionOrArgs;
			} else {
				desc = resolveString(descriptionOrArgs, this.locale, 'embeds', args);
			}
		}

		this.builder.setDescription(desc);
		return this;
	}

	addFields(fields: RestOrArray<LocaleFieldOptions>) {
		this.builder.addFields(normalizeArray(fields).map(field => this.mapField(field)));
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

	setAuthor(author: LocaleAuthor = {}) {
		let name = '';

		const isEmpty = Object.keys(author).length === 0;
		const hasNoNameSources = !(author.nameRef ?? author.name);
		const hasRefAndRaw = author.name && author.nameRef;
		const hasRawAndArgs = author.name && author.nameArgs;
		const usesKeySegment = (hasNoNameSources || isEmpty) && Boolean(this.keySegment);

		if (isValidationEnabled()) {
			if (hasNoNameSources && !this.keySegment) {
				throw new TypeError('You must provide either a key ref or raw value as a name when no embed base key is defined', { cause: author });
			}

			if (hasRefAndRaw) {
				throw new TypeError('Cannot have both a raw name and a key name in an author.', { cause: author });
			}

			if (hasRawAndArgs) {
				throw new TypeError('Cannot have name arguments on a raw name.', { cause: author });
			}
		}

		if (usesKeySegment) {
			name = resolveString(joinKeys([this.keySegment!, 'author', 'name']), this.locale, 'embeds', author.nameArgs);
		}

		if (author.nameRef) {
			name = resolveString(author.nameRef, this.locale, 'embeds', author.nameArgs);
		}

		if (author.name) {
			// biome-ignore lint/nursery/useDestructuring: this is modifying a variable not instantiation of one
			name = author.name;
		}

		this.builder.setAuthor({ name, url: author.url, iconURL: author.iconURL });
		return this;
	}

	setFooter(footer: LocaleFooter = {}) {
		let text = '';

		const isEmpty = Object.keys(footer).length === 0;
		const hasNoTextSources = !(footer.textRef ?? footer.text);
		const hasRefAndRaw = footer.text && footer.textRef;
		const hasRawAndArgs = footer.text && footer.textArgs;
		const usesKeySegment = (hasNoTextSources || isEmpty) && Boolean(this.keySegment);

		if (isValidationEnabled()) {
			if (hasNoTextSources && !this.keySegment) {
				throw new TypeError('You must provide either a key ref or raw value as a name when no embed base key is defined', { cause: footer });
			}

			if (hasRefAndRaw) {
				throw new TypeError('Cannot have both a raw text and a key text in a footer.', { cause: footer });
			}

			if (hasRawAndArgs) {
				throw new TypeError('Cannot have text arguments on a raw text.', { cause: footer });
			}
		}

		if (usesKeySegment) {
			text = resolveString(joinKeys([this.keySegment!, 'footer', 'text']), this.locale, 'embeds', footer.textArgs);
		}

		if (footer.textRef) {
			text = resolveString(footer.textRef, this.locale, 'embeds', footer.textArgs);
		}

		if (footer.text) {
			// biome-ignore lint/nursery/useDestructuring: this is modifying a variable not instantiation of one
			text = footer.text;
		}

		this.builder.setFooter({ text, iconURL: footer.iconURL });
		return this;
	}

	setColor(color: RGBTuple | number | null) {
		this.builder.setColor(color);
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

	setURL(url: string) {
		this.builder.setURL(url);
		return this;
	}

	setTimestamp(timestamp: Date | number | null = Date.now()) {
		this.builder.setTimestamp(timestamp);
		return this;
	}
}
