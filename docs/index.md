---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
    name: 'djs-localized-builders'
    text: 'Discord.js builders with first-class i18n support.'
    tagline: 'Localization without the pain of long i18n keys.'
    actions:
        - theme: brand
          text: Examples
          link: /examples
        - theme: alt
          text: API Docs
          link: /api

features:
    - title: No Duplication
      details: Define your locale keys once and the library builds the i18n key automatically.
    - title: Built on discord.js Builders
      details: The library wraps @discordjs/builders, so you get all the validation and discord.js support you could want.
    - title: Typescript Friendly
      details: Discriminated unions catch invalid configurations at compile time.
    - title: Cloudflare Workers
      details: Compatible with Cloudflare Workers for HTTP interaction bots.
    - title: Familiar
      details: Designed to feel familiar if you already know discord.js builders. Not drop in, just familiar.
---
