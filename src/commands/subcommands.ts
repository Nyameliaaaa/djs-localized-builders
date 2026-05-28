import { SlashCommandSubcommandGroupBuilder as GroupBuilder, SlashCommandSubcommandBuilder as SubcommandBuilder } from '@discordjs/builders';
import { hasMixin, mix } from 'ts-mixer';
import { joinKeys, resolveAllStrings, resolveDefaultString } from '$lib';
import { KeySegmentMixin, NameAndDescriptionMixin, SharedOptionsMixin } from '$mixins';
import type { FuncAsInput } from '$types';

export interface SlashCommandSubcommandBuilder extends SharedOptionsMixin<SubcommandBuilder>, KeySegmentMixin {}

/**
 * @group Commands
 */
@mix(SharedOptionsMixin, KeySegmentMixin)
export class SlashCommandSubcommandBuilder {
	constructor(keySegment?: string) {
		this.builder = new SubcommandBuilder();
	}

	/**
	 * @internal
	 */
	hydrateSelf(parentKeySegment?: string) {
		if (this.keySegment) {
			this.keySegment = joinKeys([parentKeySegment, 'subcommands', this.keySegment]).slice(0);

			this.setName(resolveDefaultString(joinKeys([this.keySegment, 'name']), 'commands'));
			this.setDescription(resolveDefaultString(joinKeys([this.keySegment, 'description']), 'commands'));
			this.setNameLocalizations(resolveAllStrings(joinKeys([this.keySegment, 'name']), 'commands'));
			this.setDescriptionLocalizations(resolveAllStrings(joinKeys([this.keySegment, 'description']), 'commands'));

			this.hydrateOptions();
		}

		return this;
	}
}

export interface SlashCommandSubcommandGroupBuilder extends NameAndDescriptionMixin<GroupBuilder>, KeySegmentMixin {
	addSubcommand(key: string, input?: FuncAsInput<SlashCommandSubcommandBuilder>): this;
	addSubcommand(option: FuncAsInput<SlashCommandSubcommandBuilder>): this;
	addSubcommand(option: SlashCommandSubcommandBuilder): this;
}

/**
 * @group Commands
 */
@mix(NameAndDescriptionMixin, KeySegmentMixin)
export class SlashCommandSubcommandGroupBuilder {
	/**
	 * @internal
	 */
	subcommandQueue: SlashCommandSubcommandBuilder[] = [];

	constructor(keySegment?: string) {
		this.builder = new GroupBuilder();
	}

	private isString(input: unknown): input is string {
		return typeof input === 'string';
	}

	private isFunction(input: unknown): input is FuncAsInput<SlashCommandSubcommandBuilder> {
		return typeof input === 'function' && !this.isSubcommand(input);
	}

	private isSubcommand(input: unknown): input is SlashCommandSubcommandBuilder {
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

	/**
	 * @internal
	 */
	hydrateSelf(parentKeySegment?: string) {
		if (this.keySegment) {
			this.keySegment = joinKeys([parentKeySegment, 'groups', this.keySegment]).slice(0);

			this.setName(resolveDefaultString(joinKeys([this.keySegment, 'name']), 'commands'));
			this.setDescription(resolveDefaultString(joinKeys([this.keySegment, 'description']), 'commands'));
			this.setNameLocalizations(resolveAllStrings(joinKeys([this.keySegment, 'name']), 'commands'));
			this.setDescriptionLocalizations(resolveAllStrings(joinKeys([this.keySegment, 'description']), 'commands'));

			for (const subcommand of this.subcommandQueue) {
				this.builder.addSubcommand(subcommand.hydrateSelf(this.keySegment).builder);
			}

			this.subcommandQueue = [];
		}

		return this;
	}
}
