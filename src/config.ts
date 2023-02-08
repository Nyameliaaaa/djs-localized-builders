import { disableValidators, enableValidators } from '@discordjs/builders';

interface ConfigType {
    /**
     * The function which is responsible for fetching a localized string. You must define this for the library to function.
     * @param namespace The namespace from which strings are fetched [Modified by `namespaces`].
     * @param string The string to localize in question.
     * @param lang The language to fetch the string from.
     * @param options Key/Value pairs for arguments within the string.
     * @defaultValue Empty placeholder function
     */
    getLocalizedString: (namespace: string, string: string, lang: string, options?: Record<string, any>) => string;

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
     * Whether to enable the Discord.js Builder validators.
     * @defaultValue `true`
     */
    validators?: boolean;

    /**
     * Modify the default namespace names used by the library for string fetching.
     */
    namespaces?: {
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
    };
}

let config: ConfigType = {
    getLocalizedString: (namespace: string, string: string, lang: string, options?: Record<string, any>) => {
        return 'Function not implemented.';
    },
    useUppercaseConversionForValues: false,
    seperatorChar: '.',
    validators: true,
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
		getLocalizedString: (namespace: string, string: string, lang: string, options?: Record<string, any>) => {
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
 */
export const setConfig = (newConfig: Partial<ConfigType>) => {
    if (!newConfig.validators) {
        disableValidators();
    } else {
        enableValidators();
    }

    config = { ...config, ...newConfig };
};

/**
 * Get the currently selected config.
 * @internal
 */
export const getConfig = (): ConfigType => config;
