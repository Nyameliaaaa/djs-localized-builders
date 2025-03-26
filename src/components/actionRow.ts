import {
    type AnyComponentBuilder,
    ActionRowBuilder as Builder,
    normalizeArray,
    RestOrArray
} from '@discordjs/builders';
import type {
    StringSelectMenuBuilder,
    ChannelSelectMenuBuilder,
    ButtonBuilder,
    MentionableSelectMenuBuilder,
    UserSelectMenuBuilder,
    RoleSelectMenuBuilder
} from 'components';
import { LocalizationMap } from 'discord-api-types/v10';
import { LocaleBaseKeyMixin, BuilderMixin } from 'mixins';
import { mix } from 'ts-mixer';

export interface ActionRowBuilder extends LocaleBaseKeyMixin, BuilderMixin<Builder<AnyComponentBuilder>> {}

@mix(LocaleBaseKeyMixin, BuilderMixin)
export class ActionRowBuilder {
    constructor(locale: keyof LocalizationMap, baseKey?: string) {
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
        this.builder.addComponents(
            normalizeArray(compoonents).map(compoonent => compoonent.hydrateSelf(this.locale, this.baseKey).builder)
        );

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
        this.builder.setComponents(
            normalizeArray(compoonents).map(compoonent => compoonent.hydrateSelf(this.locale, this.baseKey).builder)
        );

        return this;
    }
}
