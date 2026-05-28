import { EmbedBuilder } from '$embeds';

/**
 * Maps the internal namespace names used by {@link resolveString}, {@link resolveDefaultString}, and {@link resolveAllStrings} to the namespace names in your i18n files.
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
 * Options passed to {@link ConfigType.getLocalizedString}
 * @group Configuration
 */
export interface GetLocalizedStringOptions {
	/**
	 * The i18n namespace to resolve from, mapped to the values of {@link ConfigType.namespaces}
	 */
	namespace: string;

	/**
	 * The i18n key to resolve.
	 */
	string: string;

	/**
	 * The locale to resolve the i18n key from.
	 */
	lang: string;

	/**
	 * Interpolation arguments passed to the localized string.
	 */
	options?: Record<string, unknown>;
}

/**
 * Configuration object for `djs-localized-builders`, used by {@link setConfig}
 * @group Configuration
 */
export interface ConfigType {
	/**
	 * Resolves a localized string.
	 * @remarks The library will not function without this!
	 * Returning {@link GetLocalizedStringOptions#string} will call {@link ConfigType.onMissingKey}
	 * @param options - See {@link GetLocalizedStringOptions}.
	 */
	getLocalizedString: (options: GetLocalizedStringOptions) => string;

	/**
	 * Called by {@link resolveString}, {@link resolveDefaultString}, and {@link resolveAllStrings} when an i18n key was not found.
	 * @param lang The locale where this i18n key was not found.
	 * @param namespace The namespace where this i18n key was not found.
	 * @param key The i18n key that was not found.
	 */
	onMissingKey: (lang: string, namespace: string, key: string) => void;

	/**
	 * Called when an {@link EmbedBuilder} is instantiated.
	 * @remarks Use this to apply default properties to all embeds, such as a default color or footer.
	 * @param embed The EmbedBuilder instance.
	 * @param locale The embed's locale.
	 * @param keySegment The embed's key segment, if any.
	 */
	onCreateEmbed: (embed: EmbedBuilder, locale: string, keySegment?: string) => Promise<void> | void;

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
	 * Maps the internal namespace names used by {@link resolveString}, {@link resolveDefaultString}, and {@link resolveAllStrings} to the namespace names in your i18n files.
	 * @defaultValue `{ commands: 'commands', components: 'components', embeds: 'embeds' }`
	 */
	namespaces?: NamespaceMap;

	/**
	 * Locales to generate localizations for.
	 * @remarks Must be a valid Discord locale, see {@link https://docs.discord.com/developers/reference#locales}
	 * @defaultValue `['en-US']`
	 */
	langs: string[];

	/**
	 * Whether to enable validation of parameters.
	 * @remarks This also configures `@discordjs/builders` validation automatically.
	 * @defaultValue `true`
	 */
	validators?: boolean;
}
