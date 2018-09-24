const { run } = require('./task');
const logger = require('./logger');
const { hasOption } = require('./cliUtils');
const { getObjectFromPath } = require('./utils');

const drome = (config, start, cliOptions) => {
    let conf = config();

    const silent = hasOption(cliOptions, ['--silent', '-s', '-S', 'silent']);
    !silent && logger.header('==> staring process');

    let startPoint = getObjectFromPath(conf.tasks, start);
    let result = run(startPoint, start, cliOptions);

    !silent && logger.footer('==> ending process');

    return result;
};

module.exports = drome;