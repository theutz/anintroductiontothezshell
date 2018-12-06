const configConventional = require('@commitlint/config-conventional')

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    ...configConventional.rules,
    'type-enum': [
      2,
      'always',
      [...configConventional.rules['type-enum'][2], 'content'],
    ],
  },
}
