import { disableValidators, enableValidators } from '@discordjs/builders';
import { settings } from 'ts-mixer';
import { ConfigType } from '$types';

settings.initFunction = 'init';
settings.prototypeStrategy = 'proxy';

const defaultConfig: ConfigType = {
	getLocalizedString: ({ string }) => string,
	onMissingKey: (lang, namespace, key) => {
		throw new TypeError(`Key "${key}" was not found in the ${namespace} of ${lang}`, {
			cause: { lang, namespace, key }
		});
	},
	// biome-ignore lint/suspicious/noEmptyBlockStatements: intentional no-op default
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

let config: ConfigType = { ...defaultConfig };

const setValidators = () => {
	if (config.validators) {
		enableValidators();
	} else {
		disableValidators();
	}
};

/**
 * Set the configuration for the library.
 * @example Example #1
 *  ```ts
	setConfig({
		getLocalizedString: ({ namespace, string, lang, options }) => {
			return client.i18n.getString({ namespace, string, lang, options }) ?? string
		},
		caseFormat: 'lowercase',
		separatorChar: '_',
		validators: process.ENV.NODE_ENV === 'development',
        langs: client.i18n.langs,
		namespaces: {
			components: 'components',
			commands: 'commands',
			embeds: 'responses'
		},
        onMisingKey: (lang, namespace, key) => {
            logger.error(lang, namespace, key);
        }
	});
 * ```
 * @param newConfig The new configuration.
 * @group Configuration
 */
export const setConfig = (newConfig: Partial<ConfigType>) => {
	config = { ...config, ...newConfig };
	setValidators();
};

/**
 * Reset the configuration to default.
 * @group Configuration
 */
export const resetConfig = () => {
	config = { ...defaultConfig };
	setValidators();
};

/**
 * Get the current configuration.
 * @group Configuration
 */
export const getConfig = (): ConfigType => config;
