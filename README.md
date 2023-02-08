# djs-localized-builders

A set of builders for [discord.js](https://discord.js.org), built to allow easy localization.

## Get Started

Install `djs-localized-builders` using your favorite package manager and then add the following to your main file (where you create your client)

```ts
// initalize i18n here

setConfig({
    getLocalizedString: ({ namespace, string, lang, options }) => {
        return this.i18n.getString({ namespace, string, lang, options }) ?? 'fetch_fail';
    },
    useUppercaseConversionValues: false,
    seperatorChar: '.',
    validators: proccess.ENV.NODE_ENV === 'production',
    langs: ['en-US'],
    namespaces: {
        components: 'responses',
        commands: 'commands',
        embeds: 'responses'
    }
});

// load commands here
```

> **Warning**
> You MUST set the configuration for the library AFTER your i18n library is initialized but BEFORE your commands are loaded in order to ensure the builders can properly recieve strings.
