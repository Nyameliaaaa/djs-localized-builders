import { ContainerBuilder as Builder } from '@discordjs/builders';
import { mix } from 'ts-mixer';
import { BuilderMixin, LocaleKeySegmentMixin } from '$mixins';
import { LocaleParam } from '$types';

export interface ContainerBuilder extends BuilderMixin<Builder>, LocaleKeySegmentMixin {}

/**
 * @group Embeds
 */
@mix(LocaleKeySegmentMixin, BuilderMixin)
export class ContainerBuilder {
	constructor(locale: LocaleParam, keySegment?: string) {
		this.builder = new Builder();
	}

	clearAccentColor() {
		this.builder.clearAccentColor();
		return this;
	}

	clearId() {
		this.builder.clearId();
		return this;
	}

	setId(id: number) {
		this.builder.setId(id);
		return this;
	}

	setSpoiler(spoiler: boolean) {
		this.builder.setSpoiler(spoiler);
		return this;
	}
}
