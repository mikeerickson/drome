# Drome &nbsp; [![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=JavaScript%20task%20runner%20which%20does%20rocket%20science%20for%20you%20https%3A%2F%2Fgithub.com%2Fdromejs%2Fdrome%20%23javascript%20%23taskrunner%20%23tool%20by%20%40kodipe)

**Task runner which does 🚀 science for you**

[![Build Status](https://travis-ci.org/dromejs/drome.svg?branch=master)](https://travis-ci.org/dromejs/drome) [![Coverage Status](https://coveralls.io/repos/github/dromejs/drome/badge.svg?branch=master)](https://coveralls.io/github/dromejs/drome?branch=master)
[![npm](https://img.shields.io/npm/v/drome.svg)](https://www.npmjs.com/package/drome)
![Licence](https://img.shields.io/github/license/dromejs/drome.svg)

[![NPM](https://nodei.co/npm/drome.png)](https://nodei.co/npm/drome/)

Built with ❤︎ by **[Konrad Przydział](https://twitter.com/kodipe)**

## Features

- **zero-dependency:** doesn't need extra depedencies so it's lightweight
- **easy to use:** define tasks using command line statements or JavaScript functions
- **agnostic:** it can be used with any bundlers, frameworks etc.

## Installation

```
npm install drome --save-dev
```

## Configuration

Add `drome.config.js` file to your project with configuration:

```js
module.exports = () => {
    return {
        tasks: {
            test: "npm test",
            hello: () console.log('Hello World!')
        }
    }
}
```

## How to use

```
drome hello
```