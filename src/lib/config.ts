import { disableValidators, enableValidators } from '@discordjs/builders';
import { ConfigType } from 'types';

let config: ConfigType = {
    getLocalizedString: ({ string }) => `function_not_implemented_${string.toLocaleLowerCase()}`,
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
		validators: proccess.ENV.NODE_ENV === 'production',
        langs: client.i18n.langs , // use discord i18n codes
		namespaces: {
			components: 'components',
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
 * @category Config
 */
export const getConfig = (): ConfigType => config;
