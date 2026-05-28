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

export class BaseKeyMixin {
	public baseKey?: string;

	constructor(baseKey?: string) {
		this.baseKey = baseKey;
	}

	/**
	 * @internal
	 */
	protected init(baseKey?: string) {
		this.baseKey = baseKey;
	}
}

export class LocaleBaseKeyMixin {
	public baseKey?: string;
	public locale: LocaleString;

	constructor(locale: LocaleParam, baseKey?: string) {
		this.locale = typeof locale === 'string' ? locale : locale.locale;
		this.baseKey = baseKey;
	}

	protected init(locale: LocaleParam, baseKey?: string) {
		this.locale = typeof locale === 'string' ? locale : locale.locale;
		this.baseKey = baseKey;
	}
}
