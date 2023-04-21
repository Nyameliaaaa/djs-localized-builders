import { EmbedBuilder } from 'embeds';

/**
 * The names to use for the different namespaces from where strings are fetched.
 * @category Config
 */
export interface NamespaceMap {
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
}

/**
 * The options for the `options.getLocalizedString`
 * @category Config
 */
export interface GetLocalizedStringOptions {
    /**
     * The namespace from which the string is fetched.
     */
    namespace: string;

    /**
     * The string in question
     */
    string: string;

    /**
     * The locale to fetch from.
     */
    lang: string;

    /**
     * Any additional Key/Value arguments for the string.
     */
    options?: Record<string, any>;
}

/**
 * The type for the library config.
 * @category Config
 */
export interface ConfigType {
    /**
     * The function which is responsible for fetching a localized string. You must define this for the library to function.
     * @param {GetLocalizedStringOptions} options - The options passed by the function.
     */
    getLocalizedString: (options: GetLocalizedStringOptions) => string;

    /**
     * Called when an attempted key call is not found.
     * @param lang The langauge in which the key is missing.
     * @param namespace The namespace in which this key does not exist.
     * @param key The key which is missing.
     */
    onMissingKey: (lang: string, namespace: string, key: string) => any;

    /**
     * Called when an instance of {@see EmbedBuilder} is created.
     * @param embed The embed instance.
     * @param locale The locale of the instance.
     */
    onCreateEmbed: (embed: EmbedBuilder, locale: string) => Promise<void> | void;

    /**
     * The case your strings are coded in.
     * If you are using camelCase key names, you must use 'keep'
     * @defaultValue `false`
     */
    caseFormat: 'uppercase' | 'lowercase' | 'keep';

    /**
     * The char to join the base keys with.
     * @defaultValue '.'
     */
    seperatorChar: string;

    /**
     * Modify the default namespace names used by the library for string fetching.
     */
    namespaces?: NamespaceMap;

    /**
     * The languages that the builders should support.
     * @defaultValue 'en-US'
     */
    langs: string[];

    /**
     * Whether to enable the Discord.js Builder validators.
     * @defaultValue `true`
     */
    validators?: boolean;
}
