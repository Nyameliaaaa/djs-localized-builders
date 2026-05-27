import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        server: {
            deps: {
                inline: ['@discordjs/builders']
            }
        }
    },
    resolve: {
        alias: {
            $dist: new URL('./dist', import.meta.url).pathname
        }
    }
});
