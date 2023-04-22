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

export const localeFieldOptions = type({
    'key?': 'string',
    'name?': 'string',
    'rawName?': 'string',
    'nameArgs?': stringRecord,
    'value?': 'string',
    'rawValue?': 'string',
    'valueArgs?': stringRecord,
    'inline?': 'boolean'
});

export const localeAuthorWithKey = type({
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

export type ArgsWithRawParam = { raw?: boolean; [key: string]: any };
export type LocaleFieldOptions = typeof localeFieldOptions.infer;
export type LocaleAuthor = {
    name?: string;
    rawName?: string;
    nameArgs?: Record<string, any>;
    url?: string;
    iconURL?: string;
};

export type LocaleFooterWithoutKey = typeof localeFooterWithoutKey.infer;
export type LocaleFooterWithKey = typeof localeFooterWithKey.infer;
