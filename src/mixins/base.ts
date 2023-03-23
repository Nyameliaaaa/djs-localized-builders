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
