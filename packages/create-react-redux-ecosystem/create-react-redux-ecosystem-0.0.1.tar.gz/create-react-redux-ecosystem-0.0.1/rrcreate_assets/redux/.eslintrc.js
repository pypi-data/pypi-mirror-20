module.exports = {
  "extends": "airbnb",
  "plugins": [
      "react",
      "jsx-a11y",
      "import"
  ],
  // flow annotation が除去されたコードで eslint する
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  // グローバルの window, document を使ったときに no-undef エラーにならないようにする
  "env": {
    "browser": true
  },
  "rules": {
    "comma-dangle": "off",
    "semi": "off",
    "react/jsx-filename-extension": "off",
    "react/prefer-stateless-function": "off",
    "react/prop-types": "off",
    "no-console": "off",
    "max-len": "off",
    "arrow-parens": "off"
  },
  "globals": {
    "DEBUG": true
  }
};
