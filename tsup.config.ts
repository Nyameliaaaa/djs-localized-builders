import { defineConfig } from 'tsup';

export default defineConfig({
    clean: true,
    dts: true,
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    platform: 'node',
    sourcemap: true,
    target: 'es2022',
    tsconfig: './tsconfig.json',
    esbuildOptions(options) {
        options.alias = {
            $lib: './src/lib',
            $mixins: './src/mixins',
            $types: './src/types',
            $index: './src/index',
            $options: './src/options',
            $commands: './src/commands',
            $components: './src/components',
            $embeds: './src/embeds'
        };
    }
});
