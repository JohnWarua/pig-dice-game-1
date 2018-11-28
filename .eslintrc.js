module.exports = {
  extends: ["airbnb-base", "prettier"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true,
      classes: true
    }
  },
  env: {
    browser: true
  },
  rules: {
    "no-unused-vars": [
      1,
      {
        argsIgnorePattern: "res|next|^err"
      }
    ],
    "arrow-body-style": [2, "as-needed"],
    "no-param-reassign": [2],
    "no-console": 0,
    "import/prefer-default-export": 0,
    import: 0,
    "no-plusplus": 0,
    "no-param-reassign": 0,
    "no-alert": 0,
    "no-unused-expressions": 0,
    "no-restricted-globals": 0,
    "no-undef": 0,
    "array-callback-return": 0,
    "class-methods-use-this": [
      "error",
      {
        exceptMethods: ["render"]
      }
    ],
    "func-names": 0,
    "space-before-function-paren": 0,
    "no-use-before-define": 0,
    "comma-dangle": 0,
    "max-len": 0,
    "import/extensions": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    radix: 0,
    "no-shadow": [
      2,
      {
        hoist: "all",
        allow: ["resolve", "reject", "done", "next", "err", "error"]
      }
    ],
    quotes: [
      2,
      "single",
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        singleQuote: true,
        printWidth: 120
      }
    ]
  },
  plugins: ["prettier"]
};
