const path = require('path');

const getObjectFromPath = (obj, objectPath) => {
    if (objectPath) {
        let keys = objectPath.split('.');
        let result = obj;
        keys.forEach(key => {
            result = result[key];
        });
        return result;
    } else {
        return obj;
    }
};

const sanitizeCommand = command => {

    if (/^@{0,1}[a-zA-Z0-9][a-zA-Z0-9/]+$/.test(command)) {
        try {
            let localMainPath = require.resolve(command);
            return path.resolve(
                localMainPath.substr(0, localMainPath.indexOf('node_modules')),
                'node_modules',
                '.bin',
                command
            );
        } catch(e) {
            return command;
        }
    } else {
        return `"${command}"`;
    }

    
};

const hasOption = (options, needles = []) => {
    return needles.some((element) => {
        return (options.indexOf(element) !== -1);
    });
};

module.exports = {
    getObjectFromPath,
    sanitizeCommand,
    hasOption
};