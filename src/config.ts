import { disableValidators, enableValidators } from '@discordjs/builders';

/**
 * The names to use for the different namespaces from where strings are fetched.
 * @category Config
 */
export interface NamespaceMap {
    /**
     * The namespace used to fetch command localization strings.
     * @defaultValue 'commands'
     */
    commands: string;

    /**
     * The namespace used to fetch component localization strings.
     * @defaultValue 'components'
     */
    components: string;

    /**
     * The namespace used to fetch embed localization strings.
     * @defaultValue 'embeds'
     */
    embeds: string;
}

/**
 * The options for the `options.getLocalizedString`
 * @category Config
 */
export interface GetLocalizedStringOptions {
    /**
     * The namespace from which the string is fetched.
     */
    namespace: string;

    /**
     * The string in question
     */
    string: string;

    /**
     * The locale to fetch from.
     */
    lang: string;

    /**
     * Any additional Key/Value arguments for the string.
     */
    options?: Record<string, any>;
}

/**
 * The type for the library config.
 * @category Config
 */
export interface ConfigType {
    /**
     * The function which is responsible for fetching a localized string. You must define this for the library to function.
     * @param {GetLocalizedStringOptions} options - The options passed by the function.
     */
    getLocalizedString: (options: GetLocalizedStringOptions) => string;

    /**
     * Whether to uppercase the values of Select Menu Options & Option Choices when fetching the string.
     * @defaultValue `false`
     */
    useUppercaseConversionForValues: boolean;

    /**
     * The char to join the base keys with.
     * @defaultValue '.'
     */
    seperatorChar: string;

    /**
     * Modify the default namespace names used by the library for string fetching.
     */
    namespaces?: NamespaceMap;

    /**
     * The languages that the builders should support.
     * @defaultValue 'en-US'
     */
    langs: string[];

    /**
     * Whether to enable the Discord.js Builder validators.
     * @defaultValue `true`
     */
    validators?: boolean;
}

let config: ConfigType = {
    getLocalizedString: ({ string }) => `function_not_implemented_${string.toLocaleLowerCase()}`,
    useUppercaseConversionForValues: false,
    seperatorChar: '.',
    validators: true,
    langs: ['en-US'],
    namespaces: {
        components: 'components',
        commands: 'commands',
        embeds: 'embeds'
    }
};

/**
 * Set config for the library.
 * @example ```ts
	setConfig({
		getLocalizedString: ({ namespace, string, lang, options }) => {
			return client.i18n.getString({ namespace, string, lang, options }) ?? 'fetch_fail'
		},
		useUppercaseConversionValues: false,
		seperatorChar: '_',
		validators: proccess.ENV.NODE_ENV === 'development',
		namespaces: {
			components: 'responses',
			commands: 'commands',
			embeds: 'responses'
		}
	});
 * ```
 * @param newConfig The new config to use.
 * @category Config
 */
export const setConfig = (newConfig: Partial<ConfigType>) => {
    if (newConfig.validators) {
        enableValidators();
    } else {
        disableValidators();
    }

    config = { ...config, ...newConfig };
};

/**
 * Get the currently selected config.
 * @internal
 */
export const getConfig = (): ConfigType => config;
