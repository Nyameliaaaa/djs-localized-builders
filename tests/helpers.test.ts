import { describe, expect, it, beforeEach } from 'vitest';
import { getAllStrings, getDefaultString, GetLocalizedStringOptions, getString, joinKeys, setConfig } from '../dist';

describe('Helpers', () => {
    describe('getting strings', () => {
        beforeEach(() => {
            setConfig({
                getLocalizedString: ({ string, lang, namespace }: GetLocalizedStringOptions) =>
                    `${lang}:${namespace}:${string}`
            });
        });

        it('gets the default string', () => {
            setConfig({ validators: false });
            expect(getDefaultString('x', 'commands')).toMatch('en-US:commands:x');
        });

        it('gets the string in all locales', () => {
            setConfig({ langs: ['en-US', 'fr'], validators: false });

            expect(getAllStrings('x', 'commands')).toMatchObject({
                'en-US': 'en-US:commands:x',
                fr: 'fr:commands:x'
            });
        });

        it('gets the string in fr locale', () => {
            setConfig({ validators: false });
            expect(getString('x', 'fr', 'commands')).toMatch('fr:commands:x');
        });
    });

    it('handles namespace mapping', () => {
        setConfig({
            getLocalizedString: ({ string, lang, namespace }: GetLocalizedStringOptions) =>
                `${lang}:${namespace}:${string}`,
            validators: false,
            namespaces: { commands: 'namespace', components: 'namespace', embeds: 'namespace' }
        });

        expect(getDefaultString('x', 'commands')).toMatch('en-US:namespace:x');
    });

    describe('joinKeys', () => {
        it('handles a custom separator char', () => {
            setConfig({
                getLocalizedString: ({ string }: GetLocalizedStringOptions) => `${string}`,
                separatorChar: ':'
            });

            expect(joinKeys(['a', 'b'])).toMatch('a:b');
        });

        describe('caseFormat', () => {
            beforeEach(() => {
                setConfig({
                    getLocalizedString: ({ string }: GetLocalizedStringOptions) => `${string}`,
                    separatorChar: '.'
                });
            });

            it('handles uppercase', () => {
                setConfig({ caseFormat: 'uppercase' });

                expect(joinKeys(['a', 'b'])).toMatch('A.B');
            });

            it('handles lowercase', () => {
                setConfig({ caseFormat: 'lowercase' });

                expect(joinKeys(['A', 'B'])).toMatch('a.b');
            });

            it('handles keep', () => {
                setConfig({ caseFormat: 'keep' });

                expect(joinKeys(['A', 'b'])).toMatch('A.b');
            });
        });

        describe('handles separatorChar WITH caseFormat', () => {
            it('handles uppercase', () => {
                setConfig({
                    getLocalizedString: ({ string }: GetLocalizedStringOptions) => `${string}`,
                    caseFormat: 'uppercase',
                    separatorChar: ':'
                });

                expect(joinKeys(['a', 'b'])).toMatch('A:B');
            });

            it('handles lowercase', () => {
                setConfig({
                    getLocalizedString: ({ string }: GetLocalizedStringOptions) => `${string}`,
                    caseFormat: 'lowercase',
                    separatorChar: ':'
                });

                expect(joinKeys(['A', 'B'])).toMatch('a:b');
            });

            it('handles keep', () => {
                setConfig({
                    getLocalizedString: ({ string, lang, namespace }: GetLocalizedStringOptions) => `${string}`,
                    caseFormat: 'keep',
                    separatorChar: ':'
                });

                expect(joinKeys(['A', 'b'])).toMatch('A:b');
            });
        });
    });
});
