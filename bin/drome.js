#!/usr/bin/env node

const path = require('path');
const drome = require('../lib/drome.js');
const { args } = require('../lib/cli');

const config = path.join(path.relative(__dirname, './'), 'drome.config.js');
console.log(process.argv);

drome(
    config(
        args(process.argv).rest
    )
);