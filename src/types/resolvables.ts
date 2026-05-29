import type {
	ContextMenuCommandBuilder,
	EmbedBuilder,
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
	SlashCommandUserOption
} from '@discordjs/builders';

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
export type ApplicationCommandBuilderResolvable = CommandResolvable | OptionResolvable;
/**
 * @internal
 */
export type BuilderResolvable = ApplicationCommandBuilderResolvable | EmbedBuilder;
