## Base for next (default)
```bash
 eslint
 eslint-config-next
```

> Prettier
```bash
 prettier
 eslint-config-prettier
 eslint-plugin-prettier
```
> React
```bash
 eslint-plugin-react
 eslint-plugin-react-hooks
```

> Test
```bash
 eslint-plugin-testing-library
```

> Typescript extends
```bash
 @typescript-eslint/eslint-plugin
 @typescript-eslint/parser
```

> Styles css/scss
```bash
 sass

 stylelint
 stylelint-config-prettier
 stylelint-config-recess-order
 stylelint-config-standard-scss
 stylelint-config-recommended-scss

 yarn add stylelint stylelint-config-prettier stylelint-config-recess-order stylelint-config-standard stylelint-config-recommended-scss stylelint-config-standard-scss -D
```

> Other useful
```bash
 eslint-plugin-unused-imports
 eslint-plugin-jsx-a11y
 eslint-config-airbnb
 eslint-plugin-import
```

### Lint staged with jusky
```bash
 lint-staged
 husky
```

*package.json*
```json
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "yarn tsc --noEmit",
      "eslint --fix --ignore-path .gitignore"
    ],
    "*.scss": [
      "stylelint --fix --ignore-path .gitignore"
    ],
    "*.(ts,tsx,json,scss,md)": [
      "prettier -c \"./**/*.{ts,tsx,json,scss,md}\""
    ]
  },
```





*.eslintrc.json*
```json
{
  "root": true,

  "parserOptions": {
    "tsconfigRootDir": "",
    "project": ["./tsconfig.json"]
  },
  OR IF USING "@typescript-eslint/parser"
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },

  "plugins": ["@typescript-eslint", "testing-library", "unused-imports"],
  "extends": [
    "prettier",
    "airbnb",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended"
  ],
  "rules": {
    "no-use-before-define": "off",
    "no-debugger": "warn",
    "default-param-last": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        "prefer": "type-imports",
        "disallowTypeAnnotations": false
      }
    ],
    "import/extensions": [
      "error",
      {
        "ts": "never",
        "tsx": "never"
      }
    ],
    "import/prefer-default-export": "off",
    "semi": ["error", "always"],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [".tsx"]
      }
    ],
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": "arrow-function"
      }
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports-ts": "error",
    "sort-imports": "off",
    "prettier/prettier": ["error", {}, { "usePrettierrc": true }]
  },

  IF USING "testing-library"
  "overrides": [
    {
      "files": ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      "extends": ["plugin   :testing-library/react"]
    }
  ]
}
```

*.stylelintrc.json*
```json
{
  "extends": ["stylelint-config-standard-scss", "stylelint-config-prettier", "stylelint-config-recess-order"],
  "plugins": ["stylelint-order"],
  "rules": {
    "order/order": ["custom-properties", "declarations"],
    "selector-class-pattern": null,
    "selector-id-pattern": null,
    "no-descending-specificity": null
  }
}
```
