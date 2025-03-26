import { LocalizationMap } from 'discord-api-types/v10';
import type { BuilderResolvable } from 'types';

export class BuilderMixin<T extends BuilderResolvable> {
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

    protected init(baseKey?: string) {
        this.baseKey = baseKey;
    }
}

export class LocaleBaseKeyMixin {
    public baseKey?: string;
    public locale: keyof LocalizationMap;

    constructor(locale: keyof LocalizationMap, baseKey?: string) {
        this.locale = locale;
        this.baseKey = baseKey;
    }

    protected init(locale: keyof LocalizationMap, baseKey?: string) {
        this.locale = locale;
        this.baseKey = baseKey;
    }
}
