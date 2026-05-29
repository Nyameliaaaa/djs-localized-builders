import type { ChangelogConfig } from 'changelogen';
export default {
	repo: {
		repo: 'nyamelia/djs-localized-builders',
		provider: 'github',
		domain: 'git.gay'
	},
	types: {
		enhance: {
			title: 'Enhancements',
			semver: 'minor'
		},
		feat: {
			title: 'Features',
			semver: 'minor'
		},
		fix: {
			title: 'Bug Fixes',
			semver: 'patch'
		},
		perf: {
			title: 'Performance',
			semver: 'patch'
		},
		// hide everything else
		chore: false,
		docs: false,
		style: false,
		refactor: false,
		test: false,
		ci: false,
		build: false,
		revert: false
	},
	noAuthors: true
} satisfies Partial<ChangelogConfig>;
