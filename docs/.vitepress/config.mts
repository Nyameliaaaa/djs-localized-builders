import { defineConfig } from 'vitepress';
import typedocSidebar from '../api/typedoc-sidebar.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'djs-localized-builders',
    description: 'A set of builders for discord.js, built to allow easy localization.',
    base: '/djs-localized-builders/',
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
            { text: 'API Reference', items: typedocSidebar }
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
    }
});
