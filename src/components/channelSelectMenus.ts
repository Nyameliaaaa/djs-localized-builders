import { ChannelSelectMenuBuilder as ChannelBuilder, RestOrArray, normalizeArray } from '@discordjs/builders';
import type { ChannelType, Snowflake } from 'discord-api-types/v10';
import { BaseKeyMixin, BuilderMixin } from 'mixins';
import { mix } from 'ts-mixer';

export interface ChannelSelectMenuBuilder extends BuilderMixin<ChannelBuilder>, BaseKeyMixin {}

@mix(BuilderMixin, BaseKeyMixin)
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
