import { Locale } from 'discord-api-types/v10';
import { beforeEach, describe, expect, it } from 'vitest';
import { type GetLocalizedStringOptions, SlashCommandBuilder, setConfig } from '../dist';

beforeEach(() => {
	setConfig({
		getLocalizedString: ({ i18nKey, locale }: GetLocalizedStringOptions) => `${locale}.${i18nKey}`,
		validators: false,
		locales: ['en-US', 'fr']
	});
});

describe('SlashCommandBuilder', () => {
	describe('option w/o choices', () => {
		it('should set name, description and localizations', () => {
			const command = new SlashCommandBuilder('x').addAttachmentOption('y').toJSON();

			expect(command.options![0]).toMatchObject({
				name: `${Locale.EnglishUS}.x.options.y.name`,
				description: `${Locale.EnglishUS}.x.options.y.description`,
				name_localizations: { fr: `${Locale.French}.x.options.y.name` },
				description_localizations: { fr: `${Locale.French}.x.options.y.description` }
			});
		});
	});

	describe('options w/ choices', () => {
		it('should set name, description and localizations', () => {
			const command = new SlashCommandBuilder('x').addStringOption('y').toJSON();

			expect(command.options![0]).toMatchObject({
				name: `${Locale.EnglishUS}.x.options.y.name`,
				description: `${Locale.EnglishUS}.x.options.y.description`,
				name_localizations: { fr: `${Locale.French}.x.options.y.name` },
				description_localizations: { fr: `${Locale.French}.x.options.y.description` }
			});
		});

		describe('choices', () => {
			it('should set name, description and localizations', () => {
				const command = new SlashCommandBuilder('x').addStringOption('y', option => option.setChoices('z')).toJSON();

				// @ts-expect-error we also KNOW choices exists
				expect(command.options![0].choices[0]).toMatchObject({
					name: `${Locale.EnglishUS}.x.options.y.choices.z`,
					name_localizations: { fr: `${Locale.French}.x.options.y.choices.z` },
					value: 'z'
				});
			});

			it('should handle choices with a different value', () => {
				const command = new SlashCommandBuilder('x')
					.addStringOption('y', option => option.setChoices([{ key: 'z', value: 'z' }]))
					.toJSON();

				// @ts-expect-error we also KNOW choices exists
				expect(command.options![0].choices[0]).toMatchObject({
					name: `${Locale.EnglishUS}.x.options.y.choices.z`,
					name_localizations: { fr: `${Locale.French}.x.options.y.choices.z` },
					value: 'z'
				});
			});

			it('should handle mixed choices', () => {
				const command = new SlashCommandBuilder('x')
					.addStringOption('y', option => option.setChoices([{ key: 'a', value: 'b' }, 'c']))
					.toJSON();

				// @ts-expect-error we also KNOW choices exists
				expect(command.options![0].choices).toMatchObject([
					{
						name: `${Locale.EnglishUS}.x.options.y.choices.a`,
						name_localizations: { fr: `${Locale.French}.x.options.y.choices.a` },
						value: 'b'
					},
					{
						name: `${Locale.EnglishUS}.x.options.y.choices.c`,
						name_localizations: { fr: `${Locale.French}.x.options.y.choices.c` },
						value: 'c'
					}
				]);
			});
		});
	});

	describe('subcommands', () => {
		describe('option w/o choices', () => {
			it('should set name, description and localizations', () => {
				const command = new SlashCommandBuilder('x')
					.addSubcommand('y', subcommand => subcommand.addAttachmentOption('z'))
					.toJSON();

				// @ts-expect-error we KNOW options exists
				expect(command.options?.[0].options?.[0]).toMatchObject({
					name: `${Locale.EnglishUS}.x.subcommands.y.options.z.name`,
					description: `${Locale.EnglishUS}.x.subcommands.y.options.z.description`,
					name_localizations: { fr: `${Locale.French}.x.subcommands.y.options.z.name` },
					description_localizations: { fr: `${Locale.French}.x.subcommands.y.options.z.description` }
				});
			});
		});

		describe('options w/ choices', () => {
			it('should set name, description and localizations', () => {
				const command = new SlashCommandBuilder('x')
					.addSubcommand('y', subcommand => subcommand.addStringOption('z'))
					.toJSON();

				// @ts-expect-error we KNOW options exists
				expect(command.options![0].options?.[0]).toMatchObject({
					name: `${Locale.EnglishUS}.x.subcommands.y.options.z.name`,
					description: `${Locale.EnglishUS}.x.subcommands.y.options.z.description`,
					name_localizations: { fr: `${Locale.French}.x.subcommands.y.options.z.name` },
					description_localizations: { fr: `${Locale.French}.x.subcommands.y.options.z.description` }
				});
			});

			describe('choices', () => {
				it('should set name, description and localizations', () => {
					const command = new SlashCommandBuilder('x')
						.addSubcommand('y', subcommand => subcommand.addStringOption('a', option => option.setChoices('b')))
						.toJSON();

					// @ts-expect-error we also KNOW choices exists
					expect(command.options?.[0].options?.[0].choices[0]).toMatchObject({
						name: `${Locale.EnglishUS}.x.subcommands.y.options.a.choices.b`,
						name_localizations: { fr: `${Locale.French}.x.subcommands.y.options.a.choices.b` },
						value: 'b'
					});
				});

				it('should handle choices with a different value', () => {
					const command = new SlashCommandBuilder('x')
						.addStringOption('y', option => option.setChoices([{ key: 'z', value: 'z' }]))
						.toJSON();

					// @ts-expect-error we also KNOW choices exists
					expect(command.options![0].choices[0]).toMatchObject({
						name: `${Locale.EnglishUS}.x.options.y.choices.z`,
						name_localizations: { fr: `${Locale.French}.x.options.y.choices.z` },
						value: 'z'
					});
				});

				it('should handle mixed choices', () => {
					const command = new SlashCommandBuilder('x')
						.addStringOption('y', option => option.setChoices([{ key: 'a', value: 'b' }, 'c']))
						.toJSON();

					// @ts-expect-error we also KNOW choices exists
					expect(command.options![0].choices).toMatchObject([
						{
							name: `${Locale.EnglishUS}.x.options.y.choices.a`,
							name_localizations: { fr: `${Locale.French}.x.options.y.choices.a` },
							value: 'b'
						},
						{
							name: `${Locale.EnglishUS}.x.options.y.choices.c`,
							name_localizations: { fr: `${Locale.French}.x.options.y.choices.c` },
							value: 'c'
						}
					]);
				});
			});
		});
	});

	describe('subcommands in a subcommand group', () => {
		describe('option w/o choices', () => {
			it('should set name, description and localizations', () => {
				const command = new SlashCommandBuilder('x')
					.addSubcommandGroup('y', subcommandGroup =>
						subcommandGroup.addSubcommand('z', subcommand => subcommand.addAttachmentOption('a'))
					)
					.toJSON();

				// @ts-expect-error we KNOW options exists
				expect(command.options?.[0].options?.[0].options?.[0]).toMatchObject({
					name: `${Locale.EnglishUS}.x.groups.y.subcommands.z.options.a.name`,
					description: `${Locale.EnglishUS}.x.groups.y.subcommands.z.options.a.description`,
					name_localizations: { fr: `${Locale.French}.x.groups.y.subcommands.z.options.a.name` },
					description_localizations: { fr: `${Locale.French}.x.groups.y.subcommands.z.options.a.description` }
				});
			});
		});

		describe('options w/ choices', () => {
			it('should set name, description and localizations', () => {
				const command = new SlashCommandBuilder('x')
					.addSubcommandGroup('y', subcommandGroup =>
						subcommandGroup.addSubcommand('z', subcommand => subcommand.addStringOption('a'))
					)
					.toJSON();

				// @ts-expect-error we KNOW options exists
				expect(command.options?.[0].options?.[0].options?.[0]).toMatchObject({
					name: `${Locale.EnglishUS}.x.groups.y.subcommands.z.options.a.name`,
					description: `${Locale.EnglishUS}.x.groups.y.subcommands.z.options.a.description`,
					name_localizations: { fr: `${Locale.French}.x.groups.y.subcommands.z.options.a.name` },
					description_localizations: { fr: `${Locale.French}.x.groups.y.subcommands.z.options.a.description` }
				});
			});

			describe('choices', () => {
				it('should set name, description and localizations', () => {
					const command = new SlashCommandBuilder('x')
						.addSubcommandGroup('y', subcommandGroup =>
							subcommandGroup.addSubcommand('z', subcommand =>
								subcommand.addStringOption('a', option => option.addChoices('b'))
							)
						)
						.toJSON();

					// @ts-expect-error we KNOW options exists
					expect(command.options?.[0].options?.[0].options?.[0].choices?.[0]).toMatchObject({
						name: `${Locale.EnglishUS}.x.groups.y.subcommands.z.options.a.choices.b`,
						name_localizations: { fr: `${Locale.French}.x.groups.y.subcommands.z.options.a.choices.b` },
						value: 'b'
					});
				});

				it('should handle choices with a different value', () => {
					const command = new SlashCommandBuilder('x')
						.addSubcommandGroup('y', subcommandGroup =>
							subcommandGroup.addSubcommand('z', subcommand =>
								subcommand.addStringOption('a', option => option.addChoices({ key: 'b', value: 'c' }))
							)
						)
						.toJSON();

					// @ts-expect-error we KNOW options exists
					expect(command.options?.[0].options?.[0].options?.[0].choices?.[0]).toMatchObject({
						name: `${Locale.EnglishUS}.x.groups.y.subcommands.z.options.a.choices.b`,
						name_localizations: { fr: `${Locale.French}.x.groups.y.subcommands.z.options.a.choices.b` },
						value: 'c'
					});
				});

				it('should handle mixed choices', () => {
					const command = new SlashCommandBuilder('x')
						.addSubcommandGroup('y', subcommandGroup =>
							subcommandGroup.addSubcommand('z', subcommand =>
								subcommand.addStringOption('a', option => option.addChoices(['b', { key: 'c', value: 'd' }]))
							)
						)
						.toJSON();

					// @ts-expect-error we KNOW options exists
					expect(command.options?.[0].options?.[0].options?.[0].choices).toMatchObject([
						{
							name: `${Locale.EnglishUS}.x.groups.y.subcommands.z.options.a.choices.b`,
							name_localizations: { fr: `${Locale.French}.x.groups.y.subcommands.z.options.a.choices.b` },
							value: 'b'
						},
						{
							name: `${Locale.EnglishUS}.x.groups.y.subcommands.z.options.a.choices.c`,
							name_localizations: { fr: `${Locale.French}.x.groups.y.subcommands.z.options.a.choices.c` },
							value: 'd'
						}
					]);
				});
			});
		});
	});
});
