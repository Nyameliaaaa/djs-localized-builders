export type ArgsWithRawParam = { raw?: boolean; [key: string]: any };
export type ArgsWithRawOrKeyedParam = { raw?: boolean; localized?: boolean; [key: string]: any };

export type LocaleFieldOptions = {
    key?: string;

    name?: string;
    nameArgs?: Record<string, any>;

    value?: string;
    valueArgs?: Record<string, any>;

    rawName?: string;
    rawValue?: string;

    inline?: boolean;
};

export type TextLocaleAuthor = {
    name?: string;
    rawName?: never;
    nameArgs?: Record<string, any>;
    url?: string;
    iconURL?: string;
};

export type RawTextLocaleAuthor = {
    name?: never;
    rawName?: string;
    nameArgs?: never;
    url?: string;
    iconURL?: string;
};

export type LocaleAuthor = TextLocaleAuthor | RawTextLocaleAuthor;

export type TextLocaleFooter = {
    text?: string;
    rawText?: never;
    textArgs?: Record<string, any>;
    iconURL?: string;
};

export type RawTextLocaleFooter = {
    text?: never;
    rawText?: string;
    textArgs?: never;
    iconURL?: string;
};

export type LocaleFooter = TextLocaleFooter | RawTextLocaleFooter;
