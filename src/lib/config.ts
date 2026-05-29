import { disableValidators, enableValidators } from '@discordjs/builders';
import { settings } from 'ts-mixer';
import { Config } from '$types';

settings.initFunction = 'init';
settings.prototypeStrategy = 'proxy';

const defaultConfig: Config = {
	resolveLocalizedString: ({ i18nKey }) => i18nKey,
	onMissingKey: ({ i18nKey, locale, namespace }) => {
		throw new TypeError(`Key "${i18nKey}" was not found in the ${namespace} of ${locale}`, {
			cause: { i18nKey, namespace, locale }
		});
	},
	// biome-ignore lint/suspicious/noEmptyBlockStatements: intentional no-op default
	onCreateEmbed: () => {},
	caseFormat: 'lowercase',
	separatorChar: '.',
	validators: true,
	locales: ['en-US'],
	namespaces: {
		components: 'components',
		commands: 'commands',
		embeds: 'embeds'
	}
};

let config: Config = { ...defaultConfig };

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
		resolveLocalizedString: ({ namespace, i18nKey, locale, arguments }) => {
			return i18n.getString({ namespace, i18nKey, locale, arguments }) ?? i18nKey
		},
		caseFormat: 'uppercase',
		separatorChar: '_',
		validators: process.ENV.NODE_ENV === 'development',
        locales: i18n.locales,
	});
 * ```
 * @param newConfig The new configuration.
 * @group Configuration
 */
export const setConfig = (newConfig: Partial<Config>) => {
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
export const getConfig = (): Config => config;
