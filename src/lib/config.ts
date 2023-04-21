import { disableValidators, enableValidators } from '@discordjs/builders';
import { ConfigType } from 'types';

let config: ConfigType = {
    getLocalizedString: ({ string }) => `function_not_implemented_${string.toLocaleLowerCase()}`,
    onMissingKey: (lang, namespace, key) => {
        throw new TypeError(`Key "${key}" was not found in the ${namespace} of ${lang}`, {
            cause: { lang, namespace, key }
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCreateEmbed: (embed, locale) => {},
    caseFormat: 'lowercase',
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
		caseFormat: 'lowercase',
		seperatorChar: '_',
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
 * @category Config
 */
export const getConfig = (): ConfigType => config;
