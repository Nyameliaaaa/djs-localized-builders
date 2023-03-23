# djs-localized-builders

A set of builders for [discord.js](https://discord.js.org), built to allow easy localization.

## Get Started

Install `djs-localized-builders` using your favorite package manager and then add the following to your main file (where you create/extend the client)

```ts
// initalize i18n here

setConfig({
    getLocalizedString: ({ namespace, string, lang, options }) => {
        return i18nLib.getString({ namespace, string, lang, options }) ?? 'fetch_fail';
    },
    caseFormat: 'lowercase', // can be lowercase, uppercase or keep.
    seperatorChar: '.',
    validators: proccess.ENV.NODE_ENV === 'production',
    langs: i18nLib.langs, // using discord lang codes is required.
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

## The Philosphy

If you were given the task of making up key names for the i18n of an application command builder, you might do something like this:

```
COMMAND_NAME
COMMAND_DESCRIPTION
COMMAND_CONTEXT
COMMAND_OPTIONS_OPTION_NAME
COMMAND_OPTIONS_OPTION_DESCRIPTION
COMMAND_OPTIONS_OPTION_CHOICES_CHOICE_1
COMMAND_OPTIONS_OPTION_CHOICES_CHOICE_2
COMMAND_OPTIONS_OTHER_OPTION_NAME

OTHER_COMMAND_NAME
OTHER_COMMAND_DESCRIPTION
OTHER_COMMAND_SUBCOMMANDS_SUBCOMMAND_NAME
OTHER_COMMAND_SUBCOMMANDS_SUBCOMMAND_DESCRIPTION
```

Notice how we're repeating ourselves a lot, And that's just this one example. Now imagine this example, across all your supported langauges, and any command refrencing it. Typos are _bound_ to happen. Not only that, but it's a very time consuming proccess to keep writing this over and over again.

As for your i18n files, you can just use objects so you don't repeat yourself.
But you might ask, "What about my builders?". That's where the `Base Key` system comes in to play.

### Here's how it works

There is one simple rule: Each builder is only to care about it's part of the string.
You're probably asking what that means, so let me explain.

> Let's take this string as an example: `COMMAND_OPTIONS_OPTION`

The first builder, the `SlashCommandBuilder` is responsible for the `COMMAND` part, it only knows that it's key is `COMMAND`, it doesn't care what comes after, except for `NAME` and `DESCRIPTION`, which are implictly fetched by the lib on setting this key.

The second builder, the `StringOptionBuilder` is responsible for the `OPTION` part of the string, it only know's that it's key is `OPTION`, however, it does not fetch.

> But wait, where did `OPTIONS` come from, and how did the lib know that the `OPTION` is a child of `COMMAND`?

As options and subcommands are added to your command builders, the lib does what is essentially joining the base keys, by updating the base key of children of the command (subcommand groups, subcommands, and options) with the base key of the parent, the structure element and then their base key and whatever part it needs to fetch.

As this proccess is done at the higher-most command, the nested children are then also updated with the new base key.
