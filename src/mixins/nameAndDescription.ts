import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { LocalizationMap } from 'discord-api-types/v10';
import { ApplicationCommandBuilderResolvable } from 'types';
import { mix } from 'ts-mixer';
import { BuilderMixin } from './base';

export interface NameMixin<T extends ApplicationCommandBuilderResolvable> extends BuilderMixin<T> {}

@mix(BuilderMixin)
export class NameMixin<T extends ApplicationCommandBuilderResolvable> {
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

export interface NameAndDescriptionMixin<
    T extends Exclude<ApplicationCommandBuilderResolvable, ContextMenuCommandBuilder>
> extends NameMixin<T> {}

@mix(NameMixin)
export class NameAndDescriptionMixin<
    T extends Exclude<ApplicationCommandBuilderResolvable, ContextMenuCommandBuilder>
> {
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
