import { SlashCommandIntegerOption, SlashCommandNumberOption, SlashCommandStringOption } from '@discordjs/builders';
import { mix } from 'ts-mixer';
import { AutocompletableMixin, KeySegmentMixin, MinMaxNumberMixin } from '$mixins';

export interface SlashCommandNumberOptionBuilder extends MinMaxNumberMixin<SlashCommandNumberOption>, KeySegmentMixin {}
/**
 * @group Options
 */
@mix(MinMaxNumberMixin, KeySegmentMixin)
export class SlashCommandNumberOptionBuilder {
	constructor(keySegment?: string) {
		this.builder = new SlashCommandNumberOption();
	}
}

export interface SlashCommandIntegerOptionBuilder extends MinMaxNumberMixin<SlashCommandIntegerOption>, KeySegmentMixin {}
/**
 * @group Options
 */
@mix(MinMaxNumberMixin, KeySegmentMixin)
export class SlashCommandIntegerOptionBuilder {
	constructor(keySegment?: string) {
		this.builder = new SlashCommandIntegerOption();
	}
}

export interface SlashCommandStringOptionBuilder extends AutocompletableMixin<SlashCommandStringOption, string>, KeySegmentMixin {}
/**
 * @group Options
 */
@mix(AutocompletableMixin, KeySegmentMixin)
export class SlashCommandStringOptionBuilder {
	constructor(keySegment?: string) {
		this.builder = new SlashCommandStringOption();
	}

	setMinLength(value: number) {
		this.builder.setMinLength(value);
		return this;
	}

	setMaxLength(value: number) {
		this.builder.setMaxLength(value);
		return this;
	}

	get minLength() {
		return this.builder.min_length;
	}

	get maxLength() {
		return this.builder.max_length;
	}
}
