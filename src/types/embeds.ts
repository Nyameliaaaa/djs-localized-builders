import { type } from 'arktype';

const stringRecord = type([
    'unknown',
    '=>',
    (data, problems): data is Record<string, any> => {
        if (typeof data !== 'object' || data === null) {
            problems.add('domain', 'object');
            return false;
        }

        for (const k in data) {
            if (typeof k !== 'string') {
                problems.mustBe('a Record with exclusively string keys');
                return false;
            }
        }

        return true;
    }
]);

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

export const localeAuthorWithKey = type({
    'nameArgs?': stringRecord,
    'url?': 'string',
    'iconURL?': 'string'
});

export const localeAuthorWithoutKey = type({
    'name?': 'string',
    'rawName?': 'string',
    'nameArgs?': stringRecord,
    'url?': 'string',
    'iconURL?': 'string'
});

export const localeFooterWithKey = type({
    'textArgs?': stringRecord,
    'iconURL?': 'string'
});

export const localeFooterWithoutKey = type({
    'text?': 'string',
    'rawText?': 'string',
    'textArgs?': stringRecord,
    'iconURL?': 'string'
});

export type LocaleAuthorWithoutKey = typeof localeAuthorWithoutKey.infer;
export type LocaleAuthorWithKey = typeof localeAuthorWithKey.infer;
export type LocaleFooterWithoutKey = typeof localeFooterWithoutKey.infer;
export type LocaleFooterWithKey = typeof localeFooterWithKey.infer;
