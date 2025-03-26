import {
    ContextMenuCommandBuilder,
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
    SlashCommandUserOption
} from '@discordjs/builders';
import { getAllStrings, getDefaultString, joinKeys } from 'lib';
import { AutocompletableMixin, BaseKeyMixin, BuilderMixin, NameAndDescriptionMixin, OptionMixin } from 'mixins';
import {
    SlashCommandIntegerOptionBuilder,
    SlashCommandMentionableOptionBuilder,
    SlashCommandNumberOptionBuilder,
    SlashCommandRoleOptionBuilder,
    SlashCommandStringOptionBuilder,
    SlashCommandUserOptionBuilder,
    SlashCommandAttachmentOptionBuilder,
    SlashCommandBooleanOptionBuilder,
    SlashCommandChannelOptionBuilder
} from 'options';
import { hasMixin, mix } from 'ts-mixer';
import { FuncAsInput, OptionResolvable } from 'types';

export interface PermsV2Mixin<T extends SlashCommandBuilder | ContextMenuCommandBuilder> extends BuilderMixin<T> {}

@mix(BuilderMixin)
export class PermsV2Mixin<T extends SlashCommandBuilder | ContextMenuCommandBuilder> {
    setDefaultMemberPermissions(permissions: bigint | string | number) {
        this.builder.setDefaultMemberPermissions(permissions);
        return this;
    }

    setDMPermission(enabled: boolean) {
        this.builder.setDMPermission(enabled);
        return this;
    }

    get defaultMemberPermissions() {
        return this.builder.default_member_permissions;
    }

    get DMPermission() {
        return this.builder.dm_permission;
    }
}

export interface SharedOptionsMixin<T extends SlashCommandBuilder | SlashCommandSubcommandBuilder>
    extends NameAndDescriptionMixin<T>,
        BuilderMixin<T>,
        BaseKeyMixin {}

@mix(BuilderMixin, NameAndDescriptionMixin, BaseKeyMixin)
export class SharedOptionsMixin<T extends SlashCommandBuilder | SlashCommandSubcommandBuilder> {
    public optionQueue: OptionMixin<OptionResolvable>[] = [];

    protected isString(input: any): input is string {
        return typeof input === 'string';
    }

    private isFunction<T>(input: any): input is FuncAsInput<T> {
        return typeof input === 'function' && !this.isBuilder(input);
    }

    private isBuilder<T>(input: any): input is T {
        return hasMixin(input, OptionMixin);
    }

    private queueOption(option: OptionMixin<OptionResolvable>) {
        if (this.builder instanceof SlashCommandBuilder) {
            this.hydrateOption(option);
            this.addOption(option);
            return;
        }

        this.optionQueue.push(option);
    }

    private hydrateOption(option: OptionMixin<OptionResolvable>) {
        if (option.baseKey) {
            option.baseKey = joinKeys([this.baseKey ?? '', 'options', option.baseKey]).slice(0);

            option.setName(getDefaultString(joinKeys([option.baseKey, 'name']), 'commands'));
            option.setDescription(getDefaultString(joinKeys([option.baseKey, 'description']), 'commands'));
            option.setNameLocalizations(getAllStrings(joinKeys([option.baseKey, 'name']), 'commands'));
            option.setDescriptionLocalizations(getAllStrings(joinKeys([option.baseKey, 'description']), 'commands'));

            if (hasMixin(option, AutocompletableMixin)) {
                option.hydrateChoices(option.baseKey);
            }
        }
    }

    private addOption(option: OptionMixin<OptionResolvable>) {
        if (option.builder instanceof SlashCommandAttachmentOption) {
            this.builder.addAttachmentOption(option.builder);
        } else if (option.builder instanceof SlashCommandBooleanOption) {
            this.builder.addBooleanOption(option.builder);
        } else if (option.builder instanceof SlashCommandChannelOption) {
            this.builder.addChannelOption(option.builder);
        } else if (option.builder instanceof SlashCommandIntegerOption) {
            this.builder.addIntegerOption(option.builder);
        } else if (option.builder instanceof SlashCommandMentionableOption) {
            this.builder.addMentionableOption(option.builder);
        } else if (option.builder instanceof SlashCommandNumberOption) {
            this.builder.addNumberOption(option.builder);
        } else if (option.builder instanceof SlashCommandRoleOption) {
            this.builder.addRoleOption(option.builder);
        } else if (option.builder instanceof SlashCommandStringOption) {
            this.builder.addStringOption(option.builder);
        } else if (option.builder instanceof SlashCommandUserOption) {
            this.builder.addUserOption(option.builder);
        }
    }

    private handleCall<T extends OptionMixin<OptionResolvable>>(
        keyOrInput: string | FuncAsInput<T> | T,
        input: FuncAsInput<T> = option => option,
        OptionType: new (...args: any[]) => T
    ) {
        if (this.isString(keyOrInput)) {
            this.queueOption(input(new OptionType(keyOrInput)));
        }

        if (this.isFunction<T>(keyOrInput)) {
            this.queueOption(keyOrInput(new OptionType()));
        }

        if (this.isBuilder<T>(keyOrInput)) {
            this.queueOption(keyOrInput);
        }

        return this;
    }

    hydrateOptions() {
        for (const option of this.optionQueue) {
            this.hydrateOption(option);
            this.addOption(option);
        }

        this.optionQueue = [];

        return this;
    }

    addAttachmentOption(key: string, input?: FuncAsInput<SlashCommandAttachmentOptionBuilder>): this;
    addAttachmentOption(option: FuncAsInput<SlashCommandAttachmentOptionBuilder>): this;
    addAttachmentOption(option: SlashCommandAttachmentOptionBuilder): this;
    addAttachmentOption(
        keyOrOption: string | FuncAsInput<SlashCommandAttachmentOptionBuilder> | SlashCommandAttachmentOptionBuilder,
        input: FuncAsInput<SlashCommandAttachmentOptionBuilder> = option => option
    ) {
        this.handleCall(keyOrOption, input, SlashCommandAttachmentOptionBuilder);
        return this;
    }

    addBooleanOption(key: string, input?: FuncAsInput<SlashCommandBooleanOptionBuilder>): this;
    addBooleanOption(option: FuncAsInput<SlashCommandBooleanOptionBuilder>): this;
    addBooleanOption(option: SlashCommandBooleanOptionBuilder): this;
    addBooleanOption(
        keyOrOption: string | FuncAsInput<SlashCommandBooleanOptionBuilder> | SlashCommandBooleanOptionBuilder,
        input: FuncAsInput<SlashCommandBooleanOptionBuilder> = option => option
    ) {
        this.handleCall(keyOrOption, input, SlashCommandBooleanOptionBuilder);
        return this;
    }

    addChannelOption(key: string, input?: FuncAsInput<SlashCommandChannelOptionBuilder>): this;
    addChannelOption(option: FuncAsInput<SlashCommandChannelOptionBuilder>): this;
    addChannelOption(option: SlashCommandChannelOptionBuilder): this;
    addChannelOption(
        keyOrOption: string | FuncAsInput<SlashCommandChannelOptionBuilder> | SlashCommandChannelOptionBuilder,
        input: FuncAsInput<SlashCommandChannelOptionBuilder> = option => option
    ) {
        this.handleCall(keyOrOption, input, SlashCommandChannelOptionBuilder);
        return this;
    }

    addIntegerOption(key: string, input?: FuncAsInput<SlashCommandIntegerOptionBuilder>): this;
    addIntegerOption(option: FuncAsInput<SlashCommandIntegerOptionBuilder>): this;
    addIntegerOption(option: SlashCommandIntegerOptionBuilder): this;
    addIntegerOption(
        keyOrOption: string | FuncAsInput<SlashCommandIntegerOptionBuilder> | SlashCommandIntegerOptionBuilder,
        input: FuncAsInput<SlashCommandIntegerOptionBuilder> = option => option
    ) {
        this.handleCall(keyOrOption, input, SlashCommandIntegerOptionBuilder);
        return this;
    }

    addMentionableOption(key: string, input?: FuncAsInput<SlashCommandMentionableOptionBuilder>): this;
    addMentionableOption(option: FuncAsInput<SlashCommandMentionableOptionBuilder>): this;
    addMentionableOption(option: SlashCommandMentionableOptionBuilder): this;
    addMentionableOption(
        keyOrInput: string | FuncAsInput<SlashCommandMentionableOptionBuilder> | SlashCommandMentionableOptionBuilder,
        input: FuncAsInput<SlashCommandMentionableOptionBuilder> = option => option
    ) {
        this.handleCall(keyOrInput, input, SlashCommandMentionableOptionBuilder);
        return this;
    }

    addNumberOption(key: string, input?: FuncAsInput<SlashCommandNumberOptionBuilder>): this;
    addNumberOption(option: FuncAsInput<SlashCommandNumberOptionBuilder>): this;
    addNumberOption(option: SlashCommandNumberOptionBuilder): this;
    addNumberOption(
        keyOrInput: string | FuncAsInput<SlashCommandNumberOptionBuilder> | SlashCommandNumberOptionBuilder,
        input: FuncAsInput<SlashCommandNumberOptionBuilder> = option => option
    ) {
        this.handleCall(keyOrInput, input, SlashCommandNumberOptionBuilder);
        return this;
    }

    addRoleOption(key: string, input?: FuncAsInput<SlashCommandRoleOptionBuilder>): this;
    addRoleOption(option: FuncAsInput<SlashCommandRoleOptionBuilder>): this;
    addRoleOption(option: SlashCommandRoleOptionBuilder): this;
    addRoleOption(
        keyOrInput: string | FuncAsInput<SlashCommandRoleOptionBuilder> | SlashCommandRoleOptionBuilder,
        input: FuncAsInput<SlashCommandRoleOptionBuilder> = option => option
    ) {
        this.handleCall(keyOrInput, input, SlashCommandRoleOptionBuilder);
        return this;
    }

    addStringOption(key: string, input?: FuncAsInput<SlashCommandStringOptionBuilder>): this;
    addStringOption(option: FuncAsInput<SlashCommandStringOptionBuilder>): this;
    addStringOption(option: SlashCommandStringOptionBuilder): this;
    addStringOption(
        keyOrInput: string | FuncAsInput<SlashCommandStringOptionBuilder> | SlashCommandStringOptionBuilder,
        input: FuncAsInput<SlashCommandStringOptionBuilder> = option => option
    ) {
        this.handleCall(keyOrInput, input, SlashCommandStringOptionBuilder);
        return this;
    }

    addUserOption(key: string, input?: FuncAsInput<SlashCommandUserOptionBuilder>): this;
    addUserOption(option: FuncAsInput<SlashCommandUserOptionBuilder>): this;
    addUserOption(option: SlashCommandUserOptionBuilder): this;
    addUserOption(
        keyOrInput: string | FuncAsInput<SlashCommandUserOptionBuilder> | SlashCommandUserOptionBuilder,
        input: FuncAsInput<SlashCommandUserOptionBuilder> = option => option
    ) {
        this.handleCall(keyOrInput, input, SlashCommandUserOptionBuilder);
        return this;
    }

    get options() {
        return this.builder.options;
    }
}
