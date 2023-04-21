export interface LocaleFieldOptions {
    key?: string;

    name?: string;
    nameArgs?: Record<string, unknown>;

    value?: string;
    valueArgs?: Record<string, unknown>;

    rawName?: string;
    rawValue?: string;

    inline?: boolean;
}

export interface NonKeyLocaleAuthor {
    name?: string;
    nameArgs?: Record<string, unknown>;
    rawName?: string;
    url?: string;
    iconURL?: string;
}

export interface KeyLocaleAuthor {
    nameArgs?: Record<string, unknown>;
    url?: string;
    iconURL?: string;
}

export interface NonKeyLocaleFooter {
    text?: string;
    textArgs?: Record<string, unknown>;
    rawText?: string;
    iconURL?: string;
}

export interface KeyLocaleFooter {
    textArgs?: Record<string, unknown>;
    rawText?: string;
    iconURL?: string;
}
