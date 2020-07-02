module.exports = {
	'env': {
		'browser': true,
		'es6': true
	},
	'extends': [
		'eslint:standard',
		'plugin:vue/essential',
		'plugin:@typescript-eslint/eslint-recommended'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'parser': '@typescript-eslint/parser',
		'sourceType': 'module'
	},
	'plugins': [
		'vue',
		'@typescript-eslint'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		]
	}
}