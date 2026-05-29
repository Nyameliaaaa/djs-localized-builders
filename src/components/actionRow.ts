import { AnyComponentBuilder, ActionRowBuilder as Builder } from '@discordjs/builders';
import { mix } from 'ts-mixer';
import { BuilderMixin, LocaleKeySegmentMixin } from '$mixins';
import { LocaleParam } from '$types';

export interface ActionRowBuilder extends BuilderMixin<Builder<AnyComponentBuilder>>, LocaleKeySegmentMixin {}

/**
 * @group Embeds
 */
@mix(LocaleKeySegmentMixin, BuilderMixin)
export class ActionRowBuilder {
	constructor(locale: LocaleParam, keySegment?: string) {
		this.builder = new Builder();
	}

	clearId() {
		this.builder.clearId();
		return this;
	}

	setId(id: number) {
		this.builder.setId(id);
		return this;
	}
}
