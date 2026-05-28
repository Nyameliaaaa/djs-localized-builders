import { isValidationEnabled } from '@discordjs/builders';
import { describe, expect, it } from 'vitest';
import { getConfig, resetConfig, setConfig } from '../dist';

describe('Config', () => {
	it('sets configuration', () => {
		setConfig({
			langs: ['en-US', 'fr']
		});

		expect(getConfig()).toMatchObject({ langs: ['en-US', 'fr'] });
	});

	it('preserves defaults', () => {
		setConfig({
			langs: ['en-US', 'fr']
		});

		expect(getConfig()).toMatchObject({ langs: ['en-US', 'fr'], separatorChar: '.' });
	});

	it('disables discord.js/builders validators', () => {
		setConfig({
			validators: false
		});

		expect(isValidationEnabled()).toEqual(false);
	});

	it('resets configuration', () => {
		resetConfig();
		expect(isValidationEnabled()).toEqual(true);
	});
});
