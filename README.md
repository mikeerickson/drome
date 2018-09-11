# Drome &nbsp; [![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=JavaScript%20task%20runner%20which%20does%20rocket%20science%20for%20you%20https%3A%2F%2Fgithub.com%2Fdromejs%2Fdrome%20%23javascript%20%23taskrunner%20%23tool%20by%20%40kodipe)

**Task runner which does 🚀 science for you**

[![Build Status](https://travis-ci.org/dromejs/drome.svg?branch=master)](https://travis-ci.org/dromejs/drome) [![Coverage Status](https://coveralls.io/repos/github/dromejs/drome/badge.svg?branch=master)](https://coveralls.io/github/dromejs/drome?branch=master)
[![install size](https://packagephobia.now.sh/badge?p=drome@0.2.0)](https://packagephobia.now.sh/result?p=drome@0.2.0)
[![npm](https://img.shields.io/npm/v/drome.svg)](https://www.npmjs.com/package/drome)
![Licence](https://img.shields.io/github/license/dromejs/drome.svg)

Built with ❤︎ by **[Konrad Przydział](https://twitter.com/kodipe)**

## Introduction

Drome project is my try to create JavaScript task runner which would be easy to use, lightweight, powerful and with well maintained ecosystem.

## Features

- **easy to use:** define tasks using what you know already - command line statements or JavaScript functions
- **agnostic:** it can be used with any bundlers, frameworks etc.
- **zero-dependency:** doesn't need extra depedencies so it's lightweight

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
            hello: () => console.log('Hello World!')
        }
    }
}
```

## How to use

If you would like to run `test` task from example above, run CLI:

```
drome test
```

## Parallel tasks

If you would like to run tasks parallel, then you should use array in configuration:

```js
module.exports = () => {
    return {
        tasks: {
            parallel: [
                "npm test",
                () => console.log('Hello World!')
            ]
        }
    }
}
```
And run:
```
drome parallel
```

## "Step by step" async tasks

Sometimes you need to run tasks which are async but you need to do it "step by step". In this case you should use object notation to achieve that:

```js
module.exports = () => {
    return {
        tasks: {
            stepByStep: {
                task1: next => {
                    // async job
                    next();
                },
                task2: next => {
                    // async job
                    next();
                }
            }
        }
    }
}
```
And run:
```
drome stepByStep
```