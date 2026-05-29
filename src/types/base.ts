import type {
	ActionRowBuilder,
	AnyComponentBuilder,
	ButtonBuilder,
	ChannelSelectMenuBuilder,
	ContextMenuCommandBuilder,
	EmbedBuilder,
	MentionableSelectMenuBuilder,
	ModalBuilder,
	RoleSelectMenuBuilder,
	SlashCommandAttachmentOption,
	SlashCommandBooleanOption,
	SlashCommandBuilder,
	SlashCommandChannelOption,
	SlashCommandIntegerOption,
	SlashCommandMentionableOption,
	SlashCommandNumberOption,
	SlashCommandRoleOption,
	SlashCommandStringOption,
	SlashCommandSubcommandBuilder,
	SlashCommandSubcommandGroupBuilder,
	SlashCommandUserOption,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	TextInputBuilder,
	UserSelectMenuBuilder
} from '@discordjs/builders';
import { Locale } from 'discord-api-types/v10';

/**
 * @internal
 */
export type CommandResolvable =
	| SlashCommandBuilder
	| SlashCommandSubcommandBuilder
	| ContextMenuCommandBuilder
	| SlashCommandSubcommandGroupBuilder;

/**
 * @internal
 */
export type OptionResolvable =
	| SlashCommandAttachmentOption
	| SlashCommandBooleanOption
	| SlashCommandChannelOption
	| SlashCommandIntegerOption
	| SlashCommandMentionableOption
	| SlashCommandNumberOption
	| SlashCommandRoleOption
	| SlashCommandStringOption
	| SlashCommandUserOption;

/**
 * @internal
 */
export type SelectMenuResolvable =
	| StringSelectMenuBuilder
	| ChannelSelectMenuBuilder
	| RoleSelectMenuBuilder
	| UserSelectMenuBuilder
	| MentionableSelectMenuBuilder;

/**
 * @internal
 */
export type ComponentResolvable =
	| ActionRowBuilder<AnyComponentBuilder>
	| ButtonBuilder
	| ModalBuilder
	| TextInputBuilder
	| SelectMenuResolvable
	| StringSelectMenuOptionBuilder;

/**
 * @internal
 */
export type ApplicationCommandBuilderResolvable = CommandResolvable | OptionResolvable;
/**
 * @internal
 */
export type BuilderResolvable = ApplicationCommandBuilderResolvable | ComponentResolvable | EmbedBuilder;

export type FuncAsInput<T> = (option: T) => T;
export type LocaleString = Locale | `${Locale}`;
export type LocaleObject = { locale: LocaleString };
export type LocaleParam = LocaleString | LocaleObject;
