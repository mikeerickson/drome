#!/usr/bin/env node

const path = require('path');
const drome = require('../lib/drome.js');
const { args } = require('../lib/cli');
let config;

try {
    config = require(path.join(path.relative(__dirname, './'), 'drome.config.js'));
} catch(e) {
    if (e.code == 'MODULE_NOT_FOUND') {
        console.log('There is no drome.config.js file in current directory');
        process.exit();
    }
}

drome(() => config(
    args(process.argv).rest
), args(process.argv).task);