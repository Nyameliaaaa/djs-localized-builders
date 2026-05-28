# djs-localized-builders

[Discord.js](https://discord.js.org) builders with first-class i18n support.

## Get Started

Install `djs-localized-builders` and `@discordjs/builders` (should be installed if you're using `discord.js`) using your favorite package manager and then configure the library as shown here:

```ts
// initalize i18n here

setConfig({
  getLocalizedString: ({ namespace, string, lang, options }) => {
    return i18nLib.getString({ namespace, string, lang, options }) ?? string;
  },
  onMissingKey: (lang, namespace, key) => {
    logger.throw(lang, namespace, key);
  }, // not including this line will make it fallback to default behavior of throwing a TypeError
  caseFormat: "lowercase", // can be lowercase, uppercase or keep.
  separatorChar: ".",
  validators: process.ENV.NODE_ENV === "development",
  langs: i18nLib.langs, // using discord lang codes is required.
  namespaces: {
    components: "responses",
    commands: "commands",
    embeds: "responses",
  },
});

// load commands here
```

> **Warning**
> You MUST configure the library AFTER your i18n library is initialized but BEFORE your commands are loaded in order to ensure the builders can properly recieve strings.

## The Philosphy

> **Info**
> This assumes you are using the default configuration.

If you were given the task of making up key names for the i18n of an application command builder, you might do something like this:

```
foo.name
foo.description
foo.context
foo.options.bar.name
foo.options.bar.description
foo.options.bar.choices.foobar
foo.options.bar.choices.foobaz
foo.options.baz.name
foo.options.baz.description

a.name
a.description
a.subcommands.b.name
a.subcommands.b.description
```

Notice how we're repeating ourselves a lot, And that's just this one example. Now imagine this example, across all your supported langauges, and any command refrencing it. Typos are _bound_ to happen. Not only that, but it's a very time consuming proccess to keep writing this over and over again.

As for your i18n files, you can just use objects so you don't repeat yourself.
But you might ask, "What about my builders?". That's where the **Key Segment** system comes in to play.

### Here's how it works

There is one simple rule: Each builder is only to care about it's part of the string.
You're probably asking what that means, so let me explain.

> Let's take this string as an example: `foo.options.bar.name`

The first builder, the `SlashCommandBuilder` is responsible for the `foo` part, it only knows that it's key is `foo`, it doesn't care what comes after, except for `name` and `description`, which are implictly resolved by the lib on setting this key segment.

The second builder, the `StringOptionBuilder` is responsible for the `bar` part of the string, it only know's that it's key segment is `bar`, however, it does not resolve anything yet.

> But wait, where did `options` come from, and how did the lib know that the `bar` is a child of `foo`?

As options and subcommands are added to your command builders, the lib hydrates the child builders with the parents' key segment, joining together the key segments to form the full i18n key to resolve.

As this proccess is done at the higher-most command, the nested children are then also hydrated with the new key segment.
