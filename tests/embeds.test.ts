/** biome-ignore-all lint/suspicious/noExplicitAny: any is needed to silence typescript when testing invalid fields */
import { Locale } from 'discord-api-types/v10';
import { beforeEach, describe, expect, it } from 'vitest';
import { EmbedBuilder, type GetLocalizedStringOptions, setConfig } from '../dist';

beforeEach(() => {
	setConfig({
		getLocalizedString: ({ string, lang }: GetLocalizedStringOptions) => `${lang}.${string}`,
		validators: false,
		langs: ['en-US', 'fr']
	});
});

describe('EmbedBuilder', () => {
	describe('Config#onLocaleEmbed', () => {
		it('properly calls onLocaleEmbed', () => {
			setConfig({
				onCreateEmbed: (embed, locale, keySegment) => {
					embed.setAuthor({ name: 'testing onCreateEmbed' });
				}
			});

			const embed = new EmbedBuilder(Locale.EnglishUS);
			expect(embed.toJSON().author?.name).toBe('testing onCreateEmbed');
		});

		it('properly passes locale', () => {
			setConfig({
				onCreateEmbed: (embed, locale) => {
					embed.setAuthor({ name: locale });
				}
			});

			const embed = new EmbedBuilder(Locale.EnglishUS);
			expect(embed.toJSON().author?.name).toBe(Locale.EnglishUS);
		});

		it('properly passes keySegment', () => {
			setConfig({
				onCreateEmbed: (embed, locale, keySegment) => {
					embed.setAuthor({ name: keySegment });
				}
			});

			const embed = new EmbedBuilder(Locale.EnglishUS, 'hi');
			expect(embed.toJSON().author?.name).toBe('hi');
		});
	});

	describe('setTitle', () => {
		it('should set a raw title', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS);
			embed.setTitle('Hello', { raw: true });

			expect(embed.toJSON().title).toBe('Hello');
		});

		it('should set a ref title', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS);
			embed.setTitle('titleRef');

			expect(embed.toJSON().title).toBe(`${Locale.EnglishUS}.titleRef`);
		});

		it('should set a baseKey title', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS, 'embed');
			embed.setTitle();

			expect(embed.toJSON().title).toBe(`${Locale.EnglishUS}.embed.title`);
		});
	});

	describe('setDescription', () => {
		it('should set a raw description', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS);
			embed.setDescription('Hello', { raw: true });

			expect(embed.toJSON().description).toBe('Hello');
		});

		it('should set a ref description', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS);
			embed.setDescription('descRef');

			expect(embed.toJSON().description).toBe(`${Locale.EnglishUS}.descRef`);
		});

		it('should set a baseKey description', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS, 'embed');
			embed.setDescription();

			expect(embed.toJSON().description).toBe(`${Locale.EnglishUS}.embed.description`);
		});
	});

	describe('addFields', () => {
		it.each([
			{ name: 'Status', value: 'Online' },
			{ nameRef: 'fields.status', valueRef: 'fields.online' },
			{ key: 'status' },
			{ nameRef: 'fields.status', value: 'Online' },
			{ name: 'Status', valueRef: 'fields.online' }
		])('should accept valid field: %o', field => {
			const embed = new EmbedBuilder(Locale.EnglishUS, 'embed');
			embed.addFields([field]);
			expect(embed.toJSON().fields).toHaveLength(1);
		});
	});

	describe('setAuthor', () => {
		it('should set a raw author', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS);
			embed.setAuthor({ name: 'hi' });

			expect(embed.toJSON().author?.name).toBe('hi');
		});

		it('should set a ref author', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS);
			embed.setAuthor({ nameRef: 'authorRef' });

			expect(embed.toJSON().author?.name).toBe(`${Locale.EnglishUS}.authorRef`);
		});

		it('should set a baseKey author', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS, 'embed');
			embed.setAuthor();

			expect(embed.toJSON().author?.name).toBe(`${Locale.EnglishUS}.embed.author.name`);
		});
	});

	describe('setFooter', () => {
		it('should set a raw footer', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS);
			embed.setFooter({ text: 'hi' });

			expect(embed.toJSON().footer?.text).toBe('hi');
		});

		it('should set a ref footer', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS);
			embed.setFooter({ textRef: 'footerRef' });

			expect(embed.toJSON().footer?.text).toBe(`${Locale.EnglishUS}.footerRef`);
		});

		it('should set a baseKey footer', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS, 'embed');
			embed.setFooter();

			expect(embed.toJSON().footer?.text).toBe(`${Locale.EnglishUS}.embed.footer.text`);
		});
	});
});

describe('EmbedBuilder validations', () => {
	beforeEach(() => {
		// biome-ignore lint/suspicious/noEmptyBlockStatements: resetting onCreateEmbed
		setConfig({ validators: true, onCreateEmbed: () => {} });
	});

	describe('addFields', () => {
		it.each([
			{
				field: { name: 'x', nameRef: 'y', value: 'z' },
				error: 'Cannot have a locale reference name/value and a raw name/value'
			},
			{
				field: { name: 'x', nameArgs: {}, value: 'z' },
				error: 'Cannot have a raw name/value and locale reference name/value arguments'
			},
			{
				field: { key: 'x', nameRef: 'y', value: 'z' },
				error: 'Cannot have a field baseKey and a locale reference name/value'
			},
			{ field: {}, error: 'Embed field cannot be empty' }
		])('should reject invalid field: $field', ({ field, error }) => {
			const embed = new EmbedBuilder(Locale.EnglishUS, 'embed');
			expect(() => embed.addFields([field as any])).toThrow(error);
		});
	});

	describe('setAuthor', () => {
		it('should reject name and nameRef', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS);
			expect(() => embed.setAuthor({ name: 'hi', nameRef: 'hi' } as any)).toThrowError(TypeError);
		});

		it('should reject name and nameArgs', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS);
			expect(() => embed.setAuthor({ name: 'hi', nameArgs: { hi: 'hi' } } as any)).toThrowError(TypeError);
		});

		it('should reject name nameRef and nameArgs', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS, 'embed');
			expect(() => embed.setAuthor({ name: 'hi', nameRef: 'hi', nameArgs: { hi: 'hi' } } as any)).toThrowError(TypeError);
		});
	});

	describe('setFooter', () => {
		it('should reject text and textRef', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS);
			expect(() => embed.setFooter({ text: 'hi', textRef: 'hi' } as any)).toThrowError(TypeError);
		});

		it('should reject text and textArgs', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS);
			expect(() => embed.setFooter({ text: 'hi', textArgs: { hi: 'hi' } } as any)).toThrowError(TypeError);
		});

		it('should reject text textRef and textArgs', () => {
			const embed = new EmbedBuilder(Locale.EnglishUS, 'embed');
			expect(() => embed.setFooter({ text: 'hi', textRef: 'hi', textArgs: { hi: 'hi' } } as any)).toThrowError(TypeError);
		});
	});
});
