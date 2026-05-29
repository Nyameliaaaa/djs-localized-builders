import type { ConfigType, Namespaces } from '$types';
import { getConfig } from './config';

/**
 * Joins multiple i18n key segments.
 * @param keySegments The i18n key segments.
 * @returns The joined i18n key segments, formatted according to {@link ConfigType.caseFormat} and {@link ConfigType.separatorChar}.
 * @group i18n
 */
export function joinKeys(keySegments: (string | null | undefined)[]) {
	const config = getConfig();
	const filteredKeySegments = keySegments
		.filter(keySegment => typeof keySegment === 'string')
		.filter(keySegment => keySegment.length > 0);

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
 * @param i18nKey The i18n key.
 * @param locale The locale to resolve from.
 * @param namespace The namespace to resolve from.
 * @param args Interpolation arguments.
 * @group i18n
 */
export function resolveString(
	i18nKey: string,
	locale: string,
	namespace: Namespaces,
	args: Record<string, unknown> = {}
) {
	const config = getConfig();
	const i18nString = config.getLocalizedString({
		locale,
		namespace: config.namespaces?.[namespace] ?? namespace,
		i18nKey,
		arguments: args
	});

	const missingi18nString = !i18nString || i18nString === i18nKey;

	if (config.validators && missingi18nString) {
		config.onMissingKey(locale, config.namespaces?.[namespace] ?? namespace, i18nKey);
	}

	return i18nString;
}

/**
 * Resolves an i18n string in the `en-US` locale.
 * @param i18nKey The i18n key.
 * @param namespace The namespace to resolve from.
 * @param args Interpolation arguments.
 * @group i18n
 */
export function resolveDefaultString(i18nKey: string, namespace: Namespaces, args: Record<string, unknown> = {}) {
	return resolveString(i18nKey, 'en-US', namespace, args);
}

/**
 * Resolves an i18n string in all possible locales.
 * @param i18nKey The i18n key.
 * @param namespace The namespace to resolve from.
 * @param args Interpolation arguments.
 * @group i18n
 */
export function resolveAllStrings(i18nKey: string, namespace: Namespaces, args: Record<string, unknown> = {}) {
	const config = getConfig();
	const ret: Record<string, string> = {};

	for (const locale of config.locales) {
		ret[locale] = resolveString(i18nKey, locale, namespace, args);
	}

	return ret;
}
