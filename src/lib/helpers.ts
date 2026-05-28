import { getConfig } from '$lib';

/**
 * Joins multiple i18n key segments.
 * @param keys The i18n key segments.
 * @returns The joined i18n key segments, formatted according to {@link ConfigType.caseFormat} and {@link ConfigType.separatorChar}.
 * @group Helpers
 */
export function joinKeys(keys: string[]) {
    const config = getConfig();

    switch (config.caseFormat) {
        case 'uppercase': {
            return keys.map(key => key.toUpperCase()).join(config.separatorChar);
        }

        case 'lowercase': {
            return keys.map(key => key.toLowerCase()).join(config.separatorChar);
        }

        case 'keep': {
            return keys.join(config.separatorChar);
        }
    }
}

/**
 * Resolves a localized string in a specific locale.
 * @param string The i18n key.
 * @param lang The locale to resolve from.
 * @param namespace The namespace to resolve from.
 * @param options Interpolation arguments.
 * @group Helpers
 */
export function getString(
    string: string,
    lang: string,
    namespace: 'embeds' | 'components' | 'commands',
    options: Record<string, any> = {}
) {
    const config = getConfig();
    const val = config.getLocalizedString({
        lang,
        namespace: config.namespaces?.[namespace] ?? namespace,
        string,
        options
    });

    if (config.validators && (!val || val.includes(string))) {
        config.onMissingKey(lang, config.namespaces?.[namespace] ?? namespace, string);
    }

    return val;
}

/**
 * Resolves an i18n string in the `en-US` locale.
 * @param string The i18n key.
 * @param namespace The namespace to resolve from.
 * @param options Interpolation arguments.
 * @group Helpers
 */
export function getDefaultString(string: string, namespace: 'embeds' | 'components' | 'commands', options: Record<string, any> = {}) {
    const config = getConfig();
    const val = config.getLocalizedString({
        lang: 'en-US',
        namespace: config.namespaces?.[namespace] ?? namespace,
        string,
        options
    });

    if (config.validators && (!val || val.includes(string))) {
        config.onMissingKey('en-US', config.namespaces?.[namespace] ?? namespace, string);
    }

    return val;
}

/**
 * Resolves an i18n string in all possible locales.
 * @param string The i18n key.
 * @param namespace The namespace to resolve from.
 * @param options Interpolation arguments.
 * @group Helpers
 */
export function getAllStrings(string: string, namespace: 'embeds' | 'components' | 'commands', options: Record<string, any> = {}) {
    const config = getConfig();
    const ret: Record<string, string> = {};

    for (const lang of config.langs) {
        ret[lang] = config.getLocalizedString({
            lang,
            namespace: config.namespaces?.[namespace] ?? namespace,
            string,
            options
        });

        if (config.validators && (!ret[lang] || ret[lang].includes(string))) {
            config.onMissingKey(lang, config.namespaces?.[namespace] ?? namespace, string);
        }
    }

    return ret;
}
