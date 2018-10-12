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

module.exports = {
    hasOption,
    showHelp,
    showVersion,
    showLogs
};