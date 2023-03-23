import { settings } from 'ts-mixer';
settings.initFunction = 'init';
settings.prototypeStrategy = 'proxy';

export * from './types';
export * from './lib';
export * from './options';
export * from './test';
