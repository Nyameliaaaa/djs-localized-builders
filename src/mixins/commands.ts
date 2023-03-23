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
import { IntegerOption, MentionableOption, NumberOption, RoleOption, UserOption } from 'options';
import { hasMixin, mix } from 'ts-mixer';
import { OptionInput, OptionResolvable } from 'types';

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

    private isString(input: any): input is string {
        return typeof input === 'string';
    }

    private isFunction<T>(input: any): input is OptionInput<T> {
        return typeof input === 'function' && !this.isBuilder(input);
    }

    private isBuilder<T>(input: any): input is T {
        return hasMixin(input, OptionMixin);
    }

    private queueOption(option: OptionMixin<OptionResolvable>) {
        if (this.builder instanceof SlashCommandBuilder) {
            this.hydrateOption(option);
            this.addOption(option);
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
        keyOrInput: string | OptionInput<T> | T,
        input: OptionInput<T> = option => option,
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

    // addAttachmentOption(key: string, input: (option: AttachmentOption) => AttachmentOption = option => option) {
    //     this.addOption(input(new AttachmentOption(key)));
    //     return this;
    // }

    // addBooleanOption(key: string, input: (option: BooleanOption) => BooleanOption = option => option) {
    //     this.addOption(input(new BooleanOption(key)));
    //     return this;
    // }

    // addChannelOption(key: string, input: (option: ChannelOption) => ChannelOption = option => option) {
    //     this.addOption(input(new ChannelOption(key)));
    //     return this;
    // }

    addIntegerOption(key: string, input?: OptionInput<IntegerOption>): this;
    addIntegerOption(option: OptionInput<IntegerOption>): this;
    addIntegerOption(option: IntegerOption): this;
    addIntegerOption(
        keyOrOption: string | OptionInput<IntegerOption> | IntegerOption,
        input: OptionInput<IntegerOption> = option => option
    ) {
        this.handleCall(keyOrOption, input, IntegerOption);
        return this;
    }

    addMentionableOption(key: string, input?: OptionInput<MentionableOption>): this;
    addMentionableOption(option: OptionInput<MentionableOption>): this;
    addMentionableOption(option: MentionableOption): this;
    addMentionableOption(
        keyOrInput: string | OptionInput<MentionableOption> | MentionableOption,
        input: OptionInput<MentionableOption> = option => option
    ) {
        this.handleCall(keyOrInput, input, MentionableOption);
        return this;
    }

    addNumberOption(key: string, input?: OptionInput<NumberOption>): this;
    addNumberOption(option: OptionInput<NumberOption>): this;
    addNumberOption(option: NumberOption): this;
    addNumberOption(
        keyOrInput: string | OptionInput<NumberOption> | NumberOption,
        input: OptionInput<NumberOption> = option => option
    ) {
        this.handleCall(keyOrInput, input, NumberOption);
        return this;
    }

    addRoleOption(key: string, input?: OptionInput<RoleOption>): this;
    addRoleOption(option: OptionInput<RoleOption>): this;
    addRoleOption(option: RoleOption): this;
    addRoleOption(
        keyOrInput: string | OptionInput<RoleOption> | RoleOption,
        input: OptionInput<RoleOption> = option => option
    ) {
        this.handleCall(keyOrInput, input, RoleOption);
        return this;
    }

    // addStringOption(key: string, input: (option: StringOption) => StringOption = option => option) {
    //     this.addOption(input(new StringOption(key)));
    //     return this;
    // }

    addUserOption(key: string, input?: OptionInput<UserOption>): this;
    addUserOption(option: OptionInput<UserOption>): this;
    addUserOption(option: UserOption): this;
    addUserOption(
        keyOrInput: string | OptionInput<UserOption> | UserOption,
        input: OptionInput<UserOption> = option => option
    ) {
        this.handleCall(keyOrInput, input, UserOption);
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

    get options() {
        return this.builder.options;
    }
}
