import { SlashCommandBuilder as Builder } from '@discordjs/builders';
import { hasMixin, mix } from 'ts-mixer';
import { getAllStrings, getDefaultString, joinKeys } from '$lib';
import { BaseKeyMixin, PermsV2Mixin, SharedOptionsMixin } from '$mixins';
import type { FuncAsInput } from '$types';
import { SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from './subcommands';

/**
 * @group Commands
 */
export interface SlashCommandBuilder extends PermsV2Mixin<Builder>, SharedOptionsMixin<Builder>, BaseKeyMixin {
	addSubcommand(key: string, input?: FuncAsInput<SlashCommandSubcommandBuilder>): this;
	addSubcommand(option: FuncAsInput<SlashCommandSubcommandBuilder>): this;
	addSubcommand(option: SlashCommandSubcommandBuilder): this;

	addSubcommandGroup(key: string, input?: FuncAsInput<SlashCommandSubcommandGroupBuilder>): this;
	addSubcommandGroup(option: FuncAsInput<SlashCommandSubcommandGroupBuilder>): this;
	addSubcommandGroup(option: SlashCommandSubcommandGroupBuilder): this;
}

/**
 * @group Commands
 */
@mix(PermsV2Mixin, SharedOptionsMixin, BaseKeyMixin)
export class SlashCommandBuilder {
	constructor(baseKey?: string) {
		this.builder = new Builder();
	}

	/**
	 * @internal
	 */
	private isSubcommandFunc(input: unknown): input is FuncAsInput<SlashCommandSubcommandBuilder> {
		return typeof input === 'function' && !this.isSubcommand(input);
	}

	/**
	 * @internal
	 */
	private isSubcommand(input: unknown): input is SlashCommandSubcommandBuilder {
		return hasMixin(input, SlashCommandSubcommandBuilder);
	}

	/**
	 * @internal
	 */
	private isGroupFunc(input: unknown): input is FuncAsInput<SlashCommandSubcommandGroupBuilder> {
		return typeof input === 'function' && !this.isGroup(input);
	}

	/**
	 * @internal
	 */
	private isGroup(input: unknown): input is SlashCommandSubcommandGroupBuilder {
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

		this.builder.addSubcommandGroup(subcommandGroup!.hydrateSelf(this.baseKey ?? '').builder);
		return this;
	}

	/**
	 * Hydration of {@link SlashCommandBuilder}.
	 * @param baseKey The i18n key segment to resolve with.
	 * @internal
	 */
	protected init(baseKey?: string) {
		if (baseKey) {
			this.setName(getDefaultString(joinKeys([baseKey, 'name']), 'commands'));
			this.setDescription(getDefaultString(joinKeys([baseKey, 'description']), 'commands'));
			this.setNameLocalizations(getAllStrings(joinKeys([baseKey, 'name']), 'commands'));
			this.setDescriptionLocalizations(getAllStrings(joinKeys([baseKey, 'description']), 'commands'));
		}
	}
}
