import { beforeEach, describe, expect, it } from 'vitest';
import {
	GetLocalizedStringOptions,
	joinKeys,
	resetConfig,
	resolveAllStrings,
	resolveDefaultString,
	resolveString,
	setConfig
} from '../dist';

beforeEach(() => {
	resetConfig();
});

describe('Helpers', () => {
	describe('getting strings', () => {
		beforeEach(() => {
			setConfig({
				getLocalizedString: ({ i18nKey, locale, namespace }: GetLocalizedStringOptions) =>
					`${locale}:${namespace}:${i18nKey}`
			});
		});

		it('resolves the default string', () => {
			setConfig({ validators: false });
			expect(resolveDefaultString('x', 'commands')).toMatch('en-US:commands:x');
		});

		it('resolves the string in all locales', () => {
			setConfig({ locales: ['en-US', 'fr'], validators: false });

			expect(resolveAllStrings('x', 'commands')).toMatchObject({
				'en-US': 'en-US:commands:x',
				fr: 'fr:commands:x'
			});
		});

		it('resolves the string in fr locale', () => {
			setConfig({ validators: false });
			expect(resolveString('x', 'fr', 'commands')).toMatch('fr:commands:x');
		});
	});

	it('handles namespace mapping', () => {
		setConfig({
			getLocalizedString: ({ i18nKey, locale, namespace }: GetLocalizedStringOptions) =>
				`${locale}:${namespace}:${i18nKey}`,
			validators: false,
			namespaces: { commands: 'namespace', components: 'namespace', embeds: 'namespace' }
		});

		expect(resolveDefaultString('x', 'commands')).toMatch('en-US:namespace:x');
	});

	describe('joinKeys', () => {
		it('handles a custom separator char', () => {
			setConfig({
				getLocalizedString: ({ i18nKey }: GetLocalizedStringOptions) => `${i18nKey}`,
				separatorChar: ':'
			});

			expect(joinKeys(['a', 'b'])).toMatch('a:b');
		});

		describe('caseFormat', () => {
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
					getLocalizedString: ({ i18nKey }: GetLocalizedStringOptions) => `${i18nKey}`,
					caseFormat: 'uppercase',
					separatorChar: ':'
				});

				expect(joinKeys(['a', 'b'])).toMatch('A:B');
			});

			it('handles lowercase', () => {
				setConfig({
					getLocalizedString: ({ i18nKey }: GetLocalizedStringOptions) => `${i18nKey}`,
					caseFormat: 'lowercase',
					separatorChar: ':'
				});

				expect(joinKeys(['A', 'B'])).toMatch('a:b');
			});

			it('handles keep', () => {
				setConfig({
					getLocalizedString: ({ i18nKey }: GetLocalizedStringOptions) => `${i18nKey}`,
					caseFormat: 'keep',
					separatorChar: ':'
				});

				expect(joinKeys(['A', 'b'])).toMatch('A:b');
			});
		});

		describe('null/empty handling', () => {
			it('handles null', () => {
				expect(joinKeys(['a', null, 'b'])).toMatch('a.b');
			});

			it('handles empty string', () => {
				expect(joinKeys(['a', '', 'b'])).toMatch('a.b');
			});

			it('handles null + empty string', () => {
				expect(joinKeys(['a', '', null, 'b'])).toMatch('a.b');
			});
		});
	});
});
