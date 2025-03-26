import { SlashCommandBuilder as Builder } from '@discordjs/builders';
import {
    getAllStrings,
    getDefaultString,
    joinKeys,
    FuncAsInput,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder
} from 'index';
import { BaseKeyMixin, PermsV2Mixin, SharedOptionsMixin } from 'mixins';
import { hasMixin, mix, settings } from 'ts-mixer';
settings.initFunction = 'init';

export interface SlashCommandBuilder extends PermsV2Mixin<Builder>, SharedOptionsMixin<Builder>, BaseKeyMixin {
    addSubcommand(key: string, input?: FuncAsInput<SlashCommandSubcommandBuilder>): this;
    addSubcommand(option: FuncAsInput<SlashCommandSubcommandBuilder>): this;
    addSubcommand(option: SlashCommandSubcommandBuilder): this;

    addSubcommandGroup(key: string, input?: FuncAsInput<SlashCommandSubcommandGroupBuilder>): this;
    addSubcommandGroup(option: FuncAsInput<SlashCommandSubcommandGroupBuilder>): this;
    addSubcommandGroup(option: SlashCommandSubcommandGroupBuilder): this;
}

@mix(PermsV2Mixin, SharedOptionsMixin, BaseKeyMixin)
export class SlashCommandBuilder {
    constructor(baseKey?: string) {
        this.builder = new Builder();
    }

    private isSubcommandFunc(input: any): input is FuncAsInput<SlashCommandSubcommandBuilder> {
        return typeof input === 'function' && !this.isSubcommand(input);
    }

    private isSubcommand(input: any): input is SlashCommandSubcommandBuilder {
        return hasMixin(input, SlashCommandSubcommandBuilder);
    }

    private isGroupFunc(input: any): input is FuncAsInput<SlashCommandSubcommandGroupBuilder> {
        return typeof input === 'function' && !this.isGroup(input);
    }

    private isGroup(input: any): input is SlashCommandSubcommandGroupBuilder {
        return hasMixin(input, SlashCommandSubcommandGroupBuilder);
    }

    addSubcommand(
        keyOrInput: string | FuncAsInput<SlashCommandSubcommandBuilder> | SlashCommandSubcommandBuilder,
        input: FuncAsInput<SlashCommandSubcommandBuilder> = option => option
    ) {
        let subcommand: SlashCommandSubcommandBuilder;

        if (this.isString(keyOrInput)) {
            subcommand = input(new SlashCommandSubcommandBuilder(keyOrInput));
        }

        if (this.isSubcommandFunc(keyOrInput)) {
            subcommand = keyOrInput(new SlashCommandSubcommandBuilder());
        }

        if (this.isSubcommand(keyOrInput)) {
            subcommand = keyOrInput;
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.builder.addSubcommand(subcommand!.hydrateSelf(this.baseKey ?? '').builder);
        return this;
    }

    addSubcommandGroup(
        keyOrInput: string | FuncAsInput<SlashCommandSubcommandGroupBuilder> | SlashCommandSubcommandGroupBuilder,
        input: FuncAsInput<SlashCommandSubcommandGroupBuilder> = option => option
    ) {
        let subcommandGroup: SlashCommandSubcommandGroupBuilder;

        if (this.isString(keyOrInput)) {
            subcommandGroup = input(new SlashCommandSubcommandGroupBuilder(keyOrInput));
        }

        if (this.isGroupFunc(keyOrInput)) {
            subcommandGroup = keyOrInput(new SlashCommandSubcommandGroupBuilder());
        }

        if (this.isGroup(keyOrInput)) {
            subcommandGroup = keyOrInput;
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.builder.addSubcommandGroup(subcommandGroup!.hydrateSelf(this.baseKey ?? '').builder);
        return this;
    }

    protected init(baseKey?: string) {
        if (baseKey) {
            this.setName(getDefaultString(joinKeys([baseKey, 'name']), 'commands'));
            this.setDescription(getDefaultString(joinKeys([baseKey, 'description']), 'commands'));
            this.setNameLocalizations(getAllStrings(joinKeys([baseKey, 'name']), 'commands'));
            this.setDescriptionLocalizations(getAllStrings(joinKeys([baseKey, 'description']), 'commands'));
        }
    }
}
