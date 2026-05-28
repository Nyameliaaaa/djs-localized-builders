import { ChannelSelectMenuBuilder as ChannelBuilder, normalizeArray, RestOrArray } from '@discordjs/builders';
import type { ChannelType, Snowflake } from 'discord-api-types/v10';
import { mix } from 'ts-mixer';
import { BuilderMixin, KeySegmentMixin, SelectMenuMixin } from '$mixins';

export interface ChannelSelectMenuBuilder
	extends BuilderMixin<ChannelBuilder>,
		KeySegmentMixin,
		SelectMenuMixin<ChannelBuilder> {}

@mix(BuilderMixin, KeySegmentMixin, SelectMenuMixin)
export class ChannelSelectMenuBuilder {
	constructor(baseKey?: string) {
		this.builder = new ChannelBuilder();
	}

	addDefaultChannels(...roles: RestOrArray<Snowflake>) {
		this.builder.addDefaultChannels(normalizeArray(roles));
		return this;
	}

	setDefaultChannels(...users: RestOrArray<Snowflake>) {
		this.builder.setDefaultChannels(normalizeArray(users));
		return this;
	}

	addChannelTypes(...values: RestOrArray<ChannelType>) {
		this.builder.addChannelTypes(normalizeArray(values));
		return this;
	}

	setChannelTypes(...values: RestOrArray<ChannelType>) {
		this.builder.setChannelTypes(normalizeArray(values));
		return this;
	}
}
