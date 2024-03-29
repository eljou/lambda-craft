module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: 'eslint:recommended',
	overrides: [
		{
			env: { node: true },
			files: ['.eslintrc.{js,cjs,mjs}'],
			parserOptions: { sourceType: 'script' },
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
	},
}
