import type { ConfigType } from '$types';
import { getConfig } from './config';

/**
 * Joins multiple i18n key segments.
 * @param keySegments The i18n key segments.
 * @returns The joined i18n key segments, formatted according to {@link ConfigType.caseFormat} and {@link ConfigType.separatorChar}.
 * @group i18n
 */
export function joinKeys(keySegments: (string | null | undefined)[]) {
	const config = getConfig();
	const filteredKeySegments = keySegments.filter(keySegment => typeof keySegment === 'string').filter(keySegment => keySegment.length > 0);

	switch (config.caseFormat) {
		case 'uppercase': {
			return filteredKeySegments.map(keySegment => keySegment.toUpperCase()).join(config.separatorChar);
		}

		case 'lowercase': {
			return filteredKeySegments.map(keySegment => keySegment.toLowerCase()).join(config.separatorChar);
		}

		case 'keep': {
			return filteredKeySegments.join(config.separatorChar);
		}
	}
}

/**
 * Resolves a localized string in a specific locale.
 * @param string The i18n key.
 * @param lang The locale to resolve from.
 * @param namespace The namespace to resolve from.
 * @param options Interpolation arguments.
 * @group i18n
 */
export function resolveString(string: string, lang: string, namespace: 'embeds' | 'components' | 'commands', options: Record<string, unknown> = {}) {
	const config = getConfig();
	const val = config.getLocalizedString({
		locale: lang,
		namespace: config.namespaces?.[namespace] ?? namespace,
		i18nKey: string,
		arguments: options
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
 * @group i18n
 */
export function resolveDefaultString(string: string, namespace: 'embeds' | 'components' | 'commands', options: Record<string, unknown> = {}) {
	const config = getConfig();
	const val = config.getLocalizedString({
		locale: 'en-US',
		namespace: config.namespaces?.[namespace] ?? namespace,
		i18nKey: string,
		arguments: options
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
 * @group i18n
 */
export function resolveAllStrings(string: string, namespace: 'embeds' | 'components' | 'commands', options: Record<string, unknown> = {}) {
	const config = getConfig();
	const ret: Record<string, string> = {};

	for (const lang of config.langs) {
		ret[lang] = config.getLocalizedString({
			locale: lang,
			namespace: config.namespaces?.[namespace] ?? namespace,
			i18nKey: string,
			arguments: options
		});

		if (config.validators && (!ret[lang] || ret[lang].includes(string))) {
			config.onMissingKey(lang, config.namespaces?.[namespace] ?? namespace, string);
		}
	}

	return ret;
}
