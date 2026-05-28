import type { ContextMenuCommandBuilder } from '@discordjs/builders';
import type { LocalizationMap } from 'discord-api-types/v10';
import { mix } from 'ts-mixer';
import type { ApplicationCommandBuilderResolvable } from '$types';
import { BuilderMixin } from './base';

export interface NameMixin<_T extends ApplicationCommandBuilderResolvable> extends BuilderMixin<_T> {}

@mix(BuilderMixin)
export class NameMixin<_T extends ApplicationCommandBuilderResolvable> {
	setName(value: string) {
		this.builder.setName(value);
		return this;
	}

	setNameLocalizations(localizations: LocalizationMap) {
		this.builder.setNameLocalizations(localizations);
		return this;
	}

	get name() {
		return this.builder.name;
	}

	get nameLocalizations() {
		return this.builder.name_localizations;
	}
}

export interface NameAndDescriptionMixin<_T extends Exclude<ApplicationCommandBuilderResolvable, ContextMenuCommandBuilder>> extends NameMixin<_T> {}

@mix(NameMixin)
export class NameAndDescriptionMixin<_T extends Exclude<ApplicationCommandBuilderResolvable, ContextMenuCommandBuilder>> {
	setDescription(value: string) {
		this.builder.setDescription(value);
		return this;
	}

	setDescriptionLocalizations(localizations: LocalizationMap) {
		this.builder.setDescriptionLocalizations(localizations);
		return this;
	}

	get description() {
		return this.builder.description;
	}

	get descriptionLocalizations() {
		return this.builder.description_localizations;
	}
}
