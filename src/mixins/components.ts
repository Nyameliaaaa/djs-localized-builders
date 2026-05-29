import type { LocalizationMap } from 'discord-api-types/v10';
import { mix } from 'ts-mixer';
import type { ComponentBuilderResolvable } from '$types';
import { BuilderMixin } from './base';

export interface IdMixin<_T extends ComponentBuilderResolvable> extends BuilderMixin<_T> {}

@mix(BuilderMixin)
export class IdMixin<_T extends ComponentBuilderResolvable> {
	clearId() {
		this.builder.clearId();
		return this;
	}

	setId(id: number) {
		this.builder.setId(id);
		return this;
	}

	get id() {
		return this.builder.data.id;
	}
}
