import { EmbedBuilder } from '$embeds';

/**
 * Maps the internal namespace names used by the library to the namespace names in your i18n files.
 * @group Configuration
 */
export interface NamespaceMap {
	/**
	 * Namespace for command localization strings.
	 * @defaultValue `'commands'`
	 */
	commands: string;

	/**
	 * Namespace for component localization strings.
	 * @defaultValue `'components'`
	 */
	components: string;

	/**
	 * Namespace for embed localization strings.
	 * @defaultValue `'embeds'`
	 */
	embeds: string;
}

/**
 * Parameters passed to {@link Config#resolveLocalizedString}.
 * @group Configuration
 */
export interface ResolveLocalizedStringParams {
	/**
	 * The i18n namespace to resolve from, mapped to the values of {@link Config#namespaces}.
	 */
	namespace: string;

	/**
	 * The i18n key to resolve.
	 */
	i18nKey: string;

	/**
	 * The locale to resolve the i18n key from.
	 */
	locale: string;

	/**
	 * Interpolation arguments passed to the localized string.
	 */
	args?: Record<string, unknown>;
}

/**
 * Parameters passed to {@link Config#onMissingKey}.
 * @group Configuration
 */
export interface OnMissingKeyParams {
	/**
	 * The namespace where this i18n key was not found, mapped to the values of {@link Config#namespaces}.
	 */
	namespace: string;

	/**
	 * The i18n key that was not found.
	 */
	i18nKey: string;

	/**
	 * The locale where this i18n key was not found.
	 */
	locale: string;
}

/**
 * Parameters passed to {@link Config#onCreateEmbed}.
 * @group Configuration
 */
export interface OnCreateEmbedParams {
	/**
	 * The EmbedBuilder instance.
	 */
	embed: EmbedBuilder;

	/**
	 * The embed's locale.
	 */
	locale: string;

	/**
	 * The embed's key segment, if any.
	 */
	keySegment?: string;
}

/**
 * Configuration object for `djs-localized-builders`, used by {@link setConfig}
 * @group Configuration
 */
export interface Config {
	/**
	 * Resolves a localized string.
	 * @remarks The library will not function without this!
	 * Returning {@link ResolveLocalizedStringParams#i18nKey} will call {@link Config#onMissingKey}.
	 * @param params See {@link ResolveLocalizedStringParams}.
	 */
	resolveLocalizedString: (params: ResolveLocalizedStringParams) => string;

	/**
	 * Called by the library when an i18n key is not found.
	 * @param params See {@link OnMissingKeyParams}.
	 */
	onMissingKey: (params: OnMissingKeyParams) => void;

	/**
	 * Called when an {@link EmbedBuilder} is instantiated.
	 * @remarks Use this to apply default properties to all embeds, such as a default color or footer.
	 * @param params See {@link OnCreateEmbedParams}
	 */
	onCreateEmbed: (params: OnCreateEmbedParams) => Promise<void> | void;

	/**
	 * Casing format of your i18n keys.
	 * @remarks If you are using camelCase i18n key names, use `'keep'`.
	 * @defaultValue `'lowercase'`
	 */
	caseFormat: 'uppercase' | 'lowercase' | 'keep';

	/**
	 * The character used to join i18n key segments.
	 * @defaultValue `'.'`
	 */
	separatorChar: string;

	/**
	 * Maps the internal namespace names used by the library to the namespace names in your i18n files.
	 * @defaultValue `{ commands: 'commands', components: 'components', embeds: 'embeds' }`
	 */
	namespaces: NamespaceMap;

	/**
	 * Locales to generate localizations for.
	 * @remarks Must be valid Discord locales, see {@link https://docs.discord.com/developers/reference#locales}
	 * @defaultValue `['en-US']`
	 */
	locales: string[];

	/**
	 * Whether to enable validation of parameters.
	 * @remarks This also configures `@discordjs/builders` validation automatically.
	 * @defaultValue `true`
	 */
	validators?: boolean;
}

/**
 * @internal
 */
export type Namespaces = keyof NamespaceMap;
