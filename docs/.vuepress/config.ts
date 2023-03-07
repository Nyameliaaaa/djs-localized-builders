import { defaultTheme } from 'vuepress';
// @ts-expect-error
import { typedocPlugin } from 'vuepress-plugin-typedoc/next';
import { description } from '../../package.json';

export default {
    title: 'djs-localized-builders',
    description: description,
    theme: defaultTheme({
        navbar: [
            {
                link: 'https://github.com/night-lake/djs-localized-builders',
                text: 'Github'
            },
            {
                link: 'https://npmjs.com/package/djs-localized-builders',
                text: 'NPM'
            },
            {
                link: '/guide',
                text: 'Guide'
            },
            {
                link: '/api',
                text: 'Docs'
            }
        ]
    }),
    plugins: [
        typedocPlugin({
            hideInPageTOC: true
        })
    ]
};
