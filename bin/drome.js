#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();

const { args } = require('../lib/cli');
const drome = require('../lib/drome.js');
const { colors } = require('../lib/colors');
const completion = require('../lib/completion');

let config;
let homeConfig = () => { return { tasks: {} }; };
let projectConfig = () => { return { tasks: {} }; };
let packageConfig = () => { return { tasks: {} }; };

let homeConfigPath = path.join(homedir, 'drome.config.js');

if (fs.existsSync(homeConfigPath)) {
    homeConfig = require(homeConfigPath);
} else {
    fs.copyFileSync(path.join(__dirname, './default.drome.config.js'), homeConfigPath);
    homeConfig = require(homeConfigPath);
}

let projectConfigPath = path.join(path.resolve('./'), 'drome.config.js');
// projectConfigPath = './drome.config.js'; // this is only used when debugging

if (fs.existsSync(projectConfigPath)) {
    projectConfig = require(projectConfigPath);
} else {
    let msg = colors.white('\n🚫 Project configuration file ');
    msg += colors.magenta('drome.config.js');
    msg += colors.white(' does not exist\n');
    console.log(msg);
}

let packageConfigPath = path.join(path.resolve('./'), 'package.json');
if (fs.existsSync(packageConfigPath)) {
    const packageScripts = require(packageConfigPath).scripts;
    packageConfig = () => { return { tasks: packageScripts }; };
}


config = () => {
    return {
        tasks: Object.assign(homeConfig().tasks, projectConfig().tasks, packageConfig().tasks)
    };
};

const { cmd, task, rest } = args(process.argv);

if (cmd == 'completion') {
    completion.print({ cmd, task, rest, config: config(rest) });
} else {
    drome(() => config(rest), cmd, task, rest);
}