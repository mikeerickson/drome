const getObjectFromPath = (obj, path) => {
    if (path) {
        let keys = path.split('.');
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
    if (/^[a-zA-Z0-9]+$/.test(command)) {
        return command;
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