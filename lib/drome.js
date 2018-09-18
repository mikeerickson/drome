const { run } = require('./task');
const { getObjectFromPath } = require('./utils');

const drome = (config, start, cliOptions) => {
    let conf = config();
    let startPoint = getObjectFromPath(conf.tasks, start);

    return run(startPoint, start, cliOptions);

};

module.exports = drome;