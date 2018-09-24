#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();

const { args } = require('../lib/cli');
const drome = require('../lib/drome.js');
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
    let msg = colors.red('\n✖');
    msg += colors.yellow(' Unable to locate project ');
    msg += colors.magenta('drome.config.js\n');
    console.log(msg);
}

config = () => {
    return {
        tasks: Object.assign(homeConfig().tasks, projectConfig().tasks)
    };
};

drome(() => config(
    args(process.argv).rest
), args(process.argv).task, args(process.argv).rest);