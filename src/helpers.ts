import { getConfig } from '.';

/**
 * A helper to join multiple base key parameters.
 * @param keys The keys to join.
 * @returns The joined key.
 */
export function joinKeys(keys: string[]) {
    const config = getConfig();

    switch (config.caseFormat) {
        case 'uppercase': {
            return keys.map(key => key.toUpperCase()).join(config.seperatorChar);
        }

        case 'lowercase': {
            return keys.map(key => key.toLowerCase()).join(config.seperatorChar);
        }

        case 'keep': {
            return keys.join(config.seperatorChar);
        }
    }
}

/**
 * Get a string in the en-US locale.
 * @param string The string to get.
 * @param namespace The namespace to use.
 * @param options Any additional args.
 * @returns {string}
 */
export function getDefaultString(string: string, namespace: string, options?: Record<string, any>) {
    const config = getConfig();
    return config.getLocalizedString({
        lang: 'en-US',
        namespace,
        string,
        options
    });
}

/**
 * Get a string in all possible locales.
 * @param string The string to get.
 * @param namespace The namespace to use.
 * @param options Any additional args.
 * @returns {Record<string, string>}
 */
export function getAllStrings(string: string, namespace: string, options?: Record<string, any>) {
    const config = getConfig();
    const ret: Record<string, string> = {};

    for (const lang of config.langs) {
        ret[lang] = config.getLocalizedString({
            lang,
            namespace,
            string,
            options
        });
    }

    return ret;
}
