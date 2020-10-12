module.exports = {
  env: {
    es6: true,
    node: true,
    "jest/globals": true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    "plugin:jest/recommended",
    "plugin:jest/style"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    "max-len": ["error", { "code": 120 }],
    "vue/max-attributes-per-line": 0,
    "vue/html-self-closing": 0,
    "vue/component-tags-order": 0,
    "vue/no-v-html": 0,
    "vue/no-deprecated-destroyed-lifecycle": 0,
  },
  "plugins": ["jest"]
};
