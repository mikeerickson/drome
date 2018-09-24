#!/usr/bin/env node

const path = require('path');
const drome = require('../lib/drome.js');
const { args } = require('../lib/cli');
const { hasOption } = require('../lib/utils');
let config;

if(hasOption(process.argv, ['-V', '--version', 'version'])) {
    console.log(`v${require('../package.json').version}`);
    process.exit(0);
}

try {
    config = require(path.join(path.relative(__dirname, './'), 'drome.config.js'));
} catch (e) {
    if (e.code == 'MODULE_NOT_FOUND') {
        console.log('There is no drome.config.js file in current directory');
        process.exit(1);
    }
}

drome(() => config(
    args(process.argv).rest
), args(process.argv).task, args(process.argv).rest)
    .catch(() => process.exit(1));