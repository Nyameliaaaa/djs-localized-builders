import { AnyComponentBuilder, ActionRowBuilder as Builder } from '@discordjs/builders';
import { mix } from 'ts-mixer';
import { BuilderMixin, LocaleKeySegmentMixin } from '$mixins';
import { LocaleParam } from '$types';
import { IdMixin } from '../mixins/components';

export interface ActionRowBuilder
	extends BuilderMixin<Builder<AnyComponentBuilder>>,
		IdMixin<Builder<AnyComponentBuilder>>,
		LocaleKeySegmentMixin {}

/**
 * @group Embeds
 */
@mix(LocaleKeySegmentMixin, IdMixin, BuilderMixin)
export class ActionRowBuilder {
	constructor(locale: LocaleParam, keySegment?: string) {
		this.builder = new Builder();
	}
}
