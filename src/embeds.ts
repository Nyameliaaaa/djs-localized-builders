import { LocaleBaseKeyMixin, BuilderMixin } from 'mixins';
import { EmbedBuilder as Builder } from '@discordjs/builders';
import { mix } from 'ts-mixer';

export interface EmbedBuilder extends BuilderMixin<Builder>, LocaleBaseKeyMixin {}

@mix(LocaleBaseKeyMixin, BuilderMixin)
export class EmbedBuilder {
    constructor(locale: string, baseKey?: string) {
        this.locale = locale;
        this.baseKey = baseKey;
    }
}
