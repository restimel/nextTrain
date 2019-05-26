module.exports = {
    root: true,
    env: {
        node: true,
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended',
    ],
    // required to lint *.vue files
    plugins: [
        'vue',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': ['error', 4, {'SwitchCase': 1}],
        'comma-dangle': ['error', 'always-multiline'],
        'semi': ['error', 'always'],
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
