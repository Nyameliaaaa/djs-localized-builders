import type { APIInteraction, LocalizationMap } from 'discord-api-types/v10';
import type { BuilderResolvable, LocaleObject, LocaleParam, LocaleString } from '$types';

export class BuilderMixin<T extends BuilderResolvable> {
	/**
	 * @internal
	 */
	public builder!: T;

	toJSON() {
		return this.builder.toJSON() as ReturnType<T['toJSON']>;
	}
}

export class KeySegmentMixin {
	public keySegment?: string;

	constructor(keySegment?: string) {
		this.keySegment = keySegment;
	}
}

export class LocaleKeySegmentMixin {
	public keySegment?: string;
	public locale: LocaleString;

	constructor(locale: LocaleParam, keySegment?: string) {
		this.locale = typeof locale === 'string' ? locale : locale.locale;
		this.keySegment = keySegment;
	}
}
