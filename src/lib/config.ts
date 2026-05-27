import { disableValidators, enableValidators } from '@discordjs/builders';
import { ConfigType } from '$types';

let config: ConfigType = {
    getLocalizedString: ({ string }) => `function_not_implemented_${string.toLocaleLowerCase()}`,
    onMissingKey: (lang, namespace, key) => {
        throw new TypeError(`Key "${key}" was not found in the ${namespace} of ${lang}`, {
            cause: { lang, namespace, key }
        });
    },

    onCreateEmbed: (embed, locale) => {},
    caseFormat: 'lowercase',
    separatorChar: '.',
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
 * @example Example #1
 *  ```ts
	setConfig({
		getLocalizedString: ({ namespace, string, lang, options }) => {
			return client.i18n.getString({ namespace, string, lang, options }) ?? string
		},
		caseFormat: 'lowercase',
		separatorChar: '_',
		validators: process.ENV.NODE_ENV === 'development',
        langs: client.i18n.langs , // use discord i18n codes
		namespaces: {
			components: 'components',
			commands: 'commands',
			embeds: 'responses'
		},
        onMisingKey: (lang, namespace, key) => {
            logger.error(lang, namespace, key); // default function throws.
        }
	});
 * ```
 * @param newConfig The new config to use.
 * @group Config
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
 * @group Config
 */
export const getConfig = (): ConfigType => config;
