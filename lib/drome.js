const { run } = require('./task');
const { getObjectFromPath } = require('./utils');

const drome = (config, start, cliOptions) => {
    let conf = config();
    let startPoint = getObjectFromPath(conf.tasks, start);

    if(startPoint) {
        return run(startPoint, start, cliOptions);
    } else {
        let error = `Task '${start}' is not defined`;
        return Promise.reject(error).catch(e => {
            console.log(e);
        });
    }

};

module.exports = drome;