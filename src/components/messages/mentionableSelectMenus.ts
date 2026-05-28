import {
	MentionableSelectMenuBuilder as MentionableBuilder,
	normalizeArray,
	RestOrArray,
	RoleSelectMenuBuilder as RoleBuilder,
	UserSelectMenuBuilder as UserBuilder
} from '@discordjs/builders';
import type { APISelectMenuDefaultValue, SelectMenuDefaultValueType, Snowflake } from 'discord-api-types/v10';
import { mix } from 'ts-mixer';
import { BuilderMixin, KeySegmentMixin, SelectMenuMixin } from '$mixins';

export interface MentionableSelectMenuBuilder
	extends BuilderMixin<MentionableBuilder>,
		KeySegmentMixin,
		SelectMenuMixin<MentionableBuilder> {}

@mix(BuilderMixin, KeySegmentMixin, SelectMenuMixin)
export class MentionableSelectMenuBuilder {
	constructor(baseKey?: string) {
		this.builder = new MentionableBuilder();
	}

	addDefaultRoles(...roles: RestOrArray<Snowflake>) {
		this.builder.addDefaultRoles(normalizeArray(roles));
		return this;
	}

	addDefaultUsers(...users: RestOrArray<Snowflake>) {
		this.builder.addDefaultUsers(normalizeArray(users));
		return this;
	}

	addDefaultValues(
		...values: RestOrArray<
			| APISelectMenuDefaultValue<SelectMenuDefaultValueType.Role>
			| APISelectMenuDefaultValue<SelectMenuDefaultValueType.User>
		>
	) {
		this.builder.addDefaultValues(normalizeArray(values));
		return this;
	}

	setDefaultValues(
		...values: RestOrArray<
			| APISelectMenuDefaultValue<SelectMenuDefaultValueType.Role>
			| APISelectMenuDefaultValue<SelectMenuDefaultValueType.User>
		>
	) {
		this.builder.setDefaultValues(normalizeArray(values));
		return this;
	}
}

export interface RoleSelectMenuBuilder
	extends BuilderMixin<RoleBuilder>,
		KeySegmentMixin,
		SelectMenuMixin<RoleBuilder> {}

@mix(BuilderMixin, KeySegmentMixin, SelectMenuMixin)
export class RoleSelectMenuBuilder {
	constructor(baseKey?: string) {
		this.builder = new RoleBuilder();
	}

	addDefaultRoles(...roles: RestOrArray<Snowflake>) {
		this.builder.addDefaultRoles(normalizeArray(roles));
		return this;
	}

	setDefaultRoles(...roles: RestOrArray<Snowflake>) {
		this.builder.setDefaultRoles(normalizeArray(roles));
		return this;
	}
}

export interface UserSelectMenuBuilder
	extends BuilderMixin<UserBuilder>,
		KeySegmentMixin,
		SelectMenuMixin<UserBuilder> {}

@mix(BuilderMixin, KeySegmentMixin, SelectMenuMixin)
export class UserSelectMenuBuilder {
	constructor(baseKey?: string) {
		this.builder = new UserBuilder();
	}

	addDefaultUsers(...roles: RestOrArray<Snowflake>) {
		this.builder.addDefaultUsers(normalizeArray(roles));
		return this;
	}

	setDefaultUsers(...roles: RestOrArray<Snowflake>) {
		this.builder.setDefaultUsers(normalizeArray(roles));
		return this;
	}
}
