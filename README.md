# djs-localized-builders

A set of builders for [discord.js](https://discord.js.org), built to allow easy localization.

## Get Started

Install `djs-localized-builders` using your favorite package manager and then add the following to your main file (where you create your client)

```ts
// initalize i18n here

setConfig({
    stuff: 'yeah'
});

// load commands here
```

⚠️ **IMPORTANT**: You MUST set the configuration for the library AFTER your i18n library is initialized but BEFORE your commands are loaded in order to ensure the builders can properly recieve strings.
