const { run } = require('./task');
const { getObjectFromPath } = require('./utils')

const drome = (config, start) => {
    
    let conf = config();
    let startPoint = getObjectFromPath(conf.tasks, start);

    return run(startPoint, start);

}

module.exports = drome;