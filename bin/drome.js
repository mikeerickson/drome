#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const homedir = require('os').homedir();

const drome = require('../lib/drome.js');
const { args } = require('../lib/cli');
const { colors } = require('../lib/colors');

let config;
let homeConfig = () => { return { tasks: {} }; };
let projectConfig = () => { return { tasks: {} }; };

let homeConfigPath = path.join(homedir, 'drome.config.js');
if (fs.existsSync(homeConfigPath)) {
    homeConfig = require(homeConfigPath);
}

let projectConfigPath = path.join(path.relative(__dirname, './'), 'drome.config.js');
// projectConfigPath = './drome.config.js'; // this is only used when debugging

if (fs.existsSync(projectConfigPath)) {
    projectConfig = require(projectConfigPath);
} else {
    console.log(colors.yellow('Unable to locate project `drome.config.js` only global tasks will be available.'));
}

config = () => {
    return {
        tasks: Object.assign(homeConfig().tasks, projectConfig().tasks)
    };
};

drome(() => config(
    args(process.argv).rest
), args(process.argv).task, args(process.argv).rest);