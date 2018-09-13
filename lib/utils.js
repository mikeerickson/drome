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
    if(/^[a-zA-Z0-9]+$/.test(command)) {
        return command;
    } else {
        return `"${command}"`;
    }
};

module.exports = {
    getObjectFromPath,
    sanitizeCommand
};