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
     * Whether to uppercase the values of Select Menu Options & Option Choices when fetching the string.
     * @defaultValue `false`
     */
    useUppercaseConversionForValues: boolean;

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
