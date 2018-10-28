const { run } = require('./task');
const logger = require('./logger');
const { hasOption } = require('./cliUtils');
const { getObjectFromPath } = require('./utils');

const drome = (config, cmd = '', start = '', cliOptions) => {

    let conf = config();

    let silent = hasOption(cliOptions, ['--silent', '-s', '-S', 'silent']);
    let debug = hasOption(cliOptions, ['--debug', '-d', '-D']);
    if (!silent) {
        // if we are using cli command and not already silent, suppress logging
        silent = (
            cmd === '' ||
            cmd === 'help' || cmd === '--help' || cmd === '-h' ||
            cmd === 'init' || cmd === '--init' || cmd === '-i' ||
            cmd === 'logs' || cmd === '--logs' || cmd === '-l' ||
            cmd === 'version' || cmd === '--version' || cmd === '-v' ||
            cmd === '--debug' || cmd === '-D' || cmd === '-d');
    }

    !silent && logger.header('==> starting process');

    let startPoint = getObjectFromPath(conf.tasks, start);

    let result = run(cmd, startPoint, start, cliOptions).then(() => {
        !silent && logger.footer('==> ending process');
    });
    return result;
};

module.exports = drome;