import { ApplicationCommandType, Locale } from 'discord-api-types/v10';
import { beforeEach, describe, expect, it } from 'vitest';
import { ContextMenuCommandBuilder, type GetLocalizedStringOptions, SlashCommandBuilder, setConfig } from '../dist';

beforeEach(() => {
	setConfig({
		getLocalizedString: ({ string, lang }: GetLocalizedStringOptions) => `${lang}.${string}`,
		validators: false,
		langs: ['en-US', 'fr']
	});
});

describe('SlashCommandBuilder', () => {
	describe('init', () => {
		it('should set name, description and localizations', () => {
			const command = new SlashCommandBuilder('x').toJSON();
			expect(command).toMatchObject({
				name: `${Locale.EnglishUS}.x.name`,
				description: `${Locale.EnglishUS}.x.description`,
				name_localizations: { fr: `${Locale.French}.x.name` },
				description_localizations: { fr: `${Locale.French}.x.description` }
			});
		});
	});

	describe('addSubcommand', () => {
		it('should set name, description and localizations', () => {
			const command = new SlashCommandBuilder('x').addSubcommand('y').toJSON();
			expect(command.options?.[0]).toMatchObject({
				name: `${Locale.EnglishUS}.x.subcommands.y.name`,
				description: `${Locale.EnglishUS}.x.subcommands.y.description`,
				name_localizations: { fr: `${Locale.French}.x.subcommands.y.name` },
				description_localizations: { fr: `${Locale.French}.x.subcommands.y.description` }
			});
		});
	});

	describe('addSubcommandGroup', () => {
		it('should set name, description and localizations', () => {
			const command = new SlashCommandBuilder('x').addSubcommandGroup('y').toJSON();

			expect(command.options?.[0]).toMatchObject({
				name: `${Locale.EnglishUS}.x.groups.y.name`,
				description: `${Locale.EnglishUS}.x.groups.y.description`,
				name_localizations: { fr: `${Locale.French}.x.groups.y.name` },
				description_localizations: { fr: `${Locale.French}.x.groups.y.description` }
			});
		});

		describe('with subCommand', () => {
			it('should set name, description and localizations', () => {
				const command = new SlashCommandBuilder('x').addSubcommandGroup('y', subcomamndGroup => subcomamndGroup.addSubcommand('z')).toJSON();

				// @ts-expect-error we KNOW options exists here but we cannot assert
				expect(command.options?.[0].options[0]).toMatchObject({
					name: `${Locale.EnglishUS}.x.groups.y.subcommands.z.name`,
					description: `${Locale.EnglishUS}.x.groups.y.subcommands.z.description`,
					name_localizations: { fr: `${Locale.French}.x.groups.y.subcommands.z.name` },
					description_localizations: { fr: `${Locale.French}.x.groups.y.subcommands.z.description` }
				});
			});
		});
	});
});

describe('ContextMenuBuilder', () => {
	describe('User', () => {
		it('sets title and localizations', () => {
			const contextMenu = new ContextMenuCommandBuilder('x').setType(ApplicationCommandType.User).toJSON();
			expect(contextMenu).toMatchObject({
				name: `${Locale.EnglishUS}.x.context`,
				name_localizations: { fr: `${Locale.French}.x.context` }
			});
		});
	});

	describe('Message', () => {
		it('sets title and localizations', () => {
			const contextMenu = new ContextMenuCommandBuilder('x').setType(ApplicationCommandType.Message).toJSON();
			expect(contextMenu).toMatchObject({
				name: `${Locale.EnglishUS}.x.context`,
				name_localizations: { fr: `${Locale.French}.x.context` }
			});
		});
	});
});
