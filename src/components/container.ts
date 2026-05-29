import { ContainerBuilder as Builder } from '@discordjs/builders';
import { mix } from 'ts-mixer';
import { BuilderMixin, LocaleKeySegmentMixin } from '$mixins';
import { LocaleParam } from '$types';
import { IdMixin } from '../mixins/components';

export interface ContainerBuilder extends BuilderMixin<Builder>, IdMixin<Builder>, LocaleKeySegmentMixin {}

/**
 * @group Embeds
 */
@mix(LocaleKeySegmentMixin, IdMixin, BuilderMixin)
export class ContainerBuilder {
	constructor(locale: LocaleParam, keySegment?: string) {
		this.builder = new Builder();
	}

	clearAccentColor() {
		this.builder.clearAccentColor();
		return this;
	}

	setSpoiler(spoiler: boolean) {
		this.builder.setSpoiler(spoiler);
		return this;
	}
}
