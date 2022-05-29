module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb',
		'airbnb/hooks',
		'airbnb-typescript',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'react/require-default-props': 0,
		'no-use-before-define': 0,
		'@typescript-eslint/no-use-before-define': 0,
		'react-hooks/exhaustive-deps': 'warn',
	},
	ignorePatterns: ['.eslintrc.js'],
};
