import type {
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    ContextMenuCommandBuilder,
    SlashCommandSubcommandGroupBuilder,
    SlashCommandAttachmentOption,
    SlashCommandBooleanOption,
    SlashCommandChannelOption,
    SlashCommandIntegerOption,
    SlashCommandMentionableOption,
    SlashCommandNumberOption,
    SlashCommandRoleOption,
    SlashCommandStringOption,
    SlashCommandUserOption,
    ActionRowBuilder,
    ButtonBuilder,
    ModalBuilder,
    TextInputBuilder,
    SelectMenuBuilder,
    EmbedBuilder
} from '@discordjs/builders';

export type CommandResolvable =
    | SlashCommandBuilder
    | SlashCommandSubcommandBuilder
    | ContextMenuCommandBuilder
    | SlashCommandSubcommandGroupBuilder;

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

export type ComponentResolvable =
    | ActionRowBuilder<any>
    | ButtonBuilder
    | ModalBuilder
    | TextInputBuilder
    | SelectMenuBuilder;

export type ApplicationCommandBuilderResolvable = CommandResolvable | OptionResolvable;
export type BuilderResolvable = ApplicationCommandBuilderResolvable | ComponentResolvable | EmbedBuilder;
export type OptionInput<T> = (option: T) => T;
