import {
    SlashCommandSubcommandBuilder as SubcommandBuilder,
    SlashCommandSubcommandGroupBuilder as GroupBuilder
} from '@discordjs/builders';
import { getAllStrings, getDefaultString, joinKeys, FuncAsInput } from 'index';
import { BaseKeyMixin, BuilderMixin, NameAndDescriptionMixin, SharedOptionsMixin } from 'mixins';
import { hasMixin, mix } from 'ts-mixer';

export interface SlashCommandSubcommandBuilder extends SharedOptionsMixin<SubcommandBuilder>, BaseKeyMixin {}

@mix(SharedOptionsMixin, BaseKeyMixin)
export class SlashCommandSubcommandBuilder {
    constructor(baseKey?: string) {
        this.builder = new SubcommandBuilder();
    }

    hydrateSelf(baseKey: string) {
        if (this.baseKey) {
            this.baseKey = joinKeys([baseKey, 'subcommands', this.baseKey]).slice(0);

            this.setName(getDefaultString(joinKeys([this.baseKey, 'name']), 'commands'));
            this.setDescription(getDefaultString(joinKeys([this.baseKey, 'description']), 'commands'));
            this.setNameLocalizations(getAllStrings(joinKeys([this.baseKey, 'name']), 'commands'));
            this.setDescriptionLocalizations(getAllStrings(joinKeys([this.baseKey, 'description']), 'commands'));

            this.hydrateOptions();
        }

        return this;
    }
}

export interface SlashCommandSubcommandGroupBuilder extends NameAndDescriptionMixin<GroupBuilder>, BaseKeyMixin {
    addSubcommand(key: string, input?: FuncAsInput<SlashCommandSubcommandBuilder>): this;
    addSubcommand(option: FuncAsInput<SlashCommandSubcommandBuilder>): this;
    addSubcommand(option: SlashCommandSubcommandBuilder): this;
}

@mix(NameAndDescriptionMixin, BaseKeyMixin)
export class SlashCommandSubcommandGroupBuilder {
    subcommandQueue: SlashCommandSubcommandBuilder[] = [];

    constructor(baseKey?: string) {
        this.builder = new GroupBuilder();
    }

    private isString(input: any): input is string {
        return typeof input === 'string';
    }

    private isFunction(input: any): input is FuncAsInput<SlashCommandSubcommandBuilder> {
        return typeof input === 'function' && !this.isSubcommand(input);
    }

    private isSubcommand<T>(input: any): input is SlashCommandSubcommandBuilder {
        return hasMixin(input, SlashCommandSubcommandBuilder);
    }

    addSubcommand(
        keyOrInput: string | FuncAsInput<SlashCommandSubcommandBuilder> | SlashCommandSubcommandBuilder,
        input: FuncAsInput<SlashCommandSubcommandBuilder> = option => option
    ) {
        if (this.isString(keyOrInput)) {
            this.subcommandQueue.push(input(new SlashCommandSubcommandBuilder(keyOrInput)));
        }

        if (this.isFunction(keyOrInput)) {
            this.subcommandQueue.push(keyOrInput(new SlashCommandSubcommandBuilder()));
        }

        if (this.isSubcommand(keyOrInput)) {
            this.subcommandQueue.push(keyOrInput);
        }

        return this;
    }

    hydrateSelf(baseKey: string) {
        if (this.baseKey) {
            this.baseKey = joinKeys([baseKey, 'groups', this.baseKey]).slice(0);

            this.setName(getDefaultString(joinKeys([this.baseKey, 'name']), 'commands'));
            this.setDescription(getDefaultString(joinKeys([this.baseKey, 'description']), 'commands'));
            this.setNameLocalizations(getAllStrings(joinKeys([this.baseKey, 'name']), 'commands'));
            this.setDescriptionLocalizations(getAllStrings(joinKeys([this.baseKey, 'description']), 'commands'));

            for (const subcommand of this.subcommandQueue) {
                this.builder.addSubcommand(subcommand.hydrateSelf(this.baseKey).builder);
            }

            this.subcommandQueue = [];
        }

        return this;
    }
}
