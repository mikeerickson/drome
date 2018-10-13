const fs = require('fs');
const path = require('path');
const { colors } = require('./colors');
const pkgInfo = require('../package.json');
const { wordwrap, getTaskList } = require('./utils');

const hasOption = (options = [], needles = []) => {
    return needles.some((element) => {
        return (options.indexOf(element) !== -1);
    });
};

const showHelp = () => {
    let taskList = Object.keys(getTaskList());

    const tasks = wordwrap(taskList.join(', '), 60, '\n   ');
    const dromeInfo = colors.cyan(`${pkgInfo.name} v${pkgInfo.version}`);
    const help = `
${dromeInfo}
${colors.yellow(pkgInfo.description)}

${colors.yellow('Usage:')}
  drome run <task> [options]

Where tasks is one of:
   ${tasks}

drome <task> -h quick help for <task>
drome help <task> quick help for <task>

${colors.yellow('Options:')}
    --help, -h, help      Shows Help (this screen)
    --init, -i, init      Creates Drome Configuration File for current project
    --version, -v, help   Shows Version
    --logs, -l, logs      Display logs
    --silent, -S, silent  Turn off drome status messagses
    `;

    console.log(help);
};

const showVersion = () => {
    const dromeInfo = colors.cyan(`${pkgInfo.name} v${pkgInfo.version}`);
    console.log(dromeInfo);
};

const showLogs = () => {
    console.log(colors.magenta('Display Logs'));
};

const init = () => {
    console.log('');
    const projectConfigFile = path.join(process.cwd(), 'drome.config.js');
    if (fs.existsSync(projectConfigFile)) {
        console.log(' 🚫  Drome configuration file already exists.');
    } else {
        const projectDefaultFile = path.join(__dirname, '../bin', 'project.drome.config.js');
        fs.copyFileSync(projectDefaultFile, projectConfigFile);
        console.log(' ✅ ' + ' Project configuration file ' + colors.magenta('drome.config.js') + ' created successfully');
    }
};

module.exports = {
    hasOption,
    init,
    showHelp,
    showVersion,
    showLogs
};