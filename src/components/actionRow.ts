import { type AnyComponentBuilder, ActionRowBuilder as Builder, normalizeArray, RestOrArray } from '@discordjs/builders';
import { LocalizationMap } from 'discord-api-types/v10';
import { mix } from 'ts-mixer';
import { BuilderMixin, LocaleBaseKeyMixin } from '$mixins';
import { LocaleString } from '$types';
import type {
	ButtonBuilder,
	ChannelSelectMenuBuilder,
	MentionableSelectMenuBuilder,
	RoleSelectMenuBuilder,
	StringSelectMenuBuilder,
	UserSelectMenuBuilder
} from './messages';

export interface ActionRowBuilder extends LocaleBaseKeyMixin, BuilderMixin<Builder<AnyComponentBuilder>> {}

@mix(LocaleBaseKeyMixin, BuilderMixin)
export class ActionRowBuilder {
	constructor(locale: LocaleString, baseKey?: string) {
		this.builder = new Builder();
	}

	addComponents(
		...compoonents: RestOrArray<
			| ChannelSelectMenuBuilder
			| StringSelectMenuBuilder
			| ButtonBuilder
			| MentionableSelectMenuBuilder
			| UserSelectMenuBuilder
			| RoleSelectMenuBuilder
		>
	) {
		this.builder.addComponents(normalizeArray(compoonents).map(compoonent => compoonent.hydrateSelf(this.locale, this.baseKey).builder));

		return this;
	}

	setComponents(
		...compoonents: RestOrArray<
			| ChannelSelectMenuBuilder
			| StringSelectMenuBuilder
			| ButtonBuilder
			| MentionableSelectMenuBuilder
			| UserSelectMenuBuilder
			| RoleSelectMenuBuilder
		>
	) {
		this.builder.setComponents(normalizeArray(compoonents).map(compoonent => compoonent.hydrateSelf(this.locale, this.baseKey).builder));

		return this;
	}
}
