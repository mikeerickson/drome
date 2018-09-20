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
    try {
        let localMainPath = require.resolve(command);
        return path.resolve(
            localMainPath.substr(0, localMainPath.indexOf('node_modules')),
            'node_modules',
            '.bin',
            command
        );
    } catch(e) {
        if (/^[a-zA-Z0-9]+$/.test(command)) {
            return command;
        } else {
            return `"${command}"`;
        }
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