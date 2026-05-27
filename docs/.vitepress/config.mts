import { defineConfig } from 'vitepress';
import typedocSidebar from '../api/typedoc-sidebar.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'djs-localized-builders',
    description: 'A set of builders for discord.js, built to allow easy localization.',
    base: '/djs-localized-builders/',
    cleanUrls: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/examples' }
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [{ text: 'Examples', link: '/examples' }]
            },
            { text: 'API Reference', items: [{ text: 'All Items', link: '/api' }, ...typedocSidebar] }
        ],

        outline: {
            level: 'deep'
        },

        socialLinks: [{ icon: 'github', link: 'https://git.gay/nyamelia/djs-localized-builders' }],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023-present Amelia Rose'
        },

        editLink: {
            pattern: 'https://git.gay/nyamelia/djs-localized-builders/_edit/main/docs/:path',
            text: 'Edit this page on git.gay'
        },

        search: {
            provider: 'local'
        }
    }
});
