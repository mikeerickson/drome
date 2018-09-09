const { command, sync, async } = require('./task');
const { getObjectFromPath } = require('./utils')

const drome = (config, start) => {
    
    let conf = config();
    let startPoint = getObjectFromPath(conf.tasks, start);

    if (typeof startPoint === 'string') {
        command(startPoint);
    } else if (typeof startPoint === 'function') {
        if (startPoint.length > 0) {
            async(startPoint)
        } else {
            sync(startPoint);
        }
    } else if (Array.isArray(startPoint)) {
        // Parallel tasks
    } else {
        // Step-by-step tasks
       
    }

}

module.exports = drome;