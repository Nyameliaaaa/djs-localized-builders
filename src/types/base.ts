import { Locale } from 'discord-api-types/v10';

export type FuncAsInput<T> = (option: T) => T;
export type LocaleString = Locale | `${Locale}`;
export type LocaleObject = { locale: LocaleString };
export type LocaleParam = LocaleString | LocaleObject;
