import type {
    ActionRowBuilder,
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

export type SelectMenuResolvable =
    | StringSelectMenuBuilder
    | ChannelSelectMenuBuilder
    | RoleSelectMenuBuilder
    | UserSelectMenuBuilder
    | MentionableSelectMenuBuilder;

export type ComponentResolvable =
    | ActionRowBuilder<any>
    | ButtonBuilder
    | ModalBuilder
    | TextInputBuilder
    | SelectMenuResolvable
    | StringSelectMenuOptionBuilder;

export type ApplicationCommandBuilderResolvable = CommandResolvable | OptionResolvable;
export type BuilderResolvable = ApplicationCommandBuilderResolvable | ComponentResolvable | EmbedBuilder;

export type FuncAsInput<T> = (option: T) => T;
