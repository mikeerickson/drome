const getObjectFromPath = (obj, path) => {
    if (path) {
        let keys = path.split('.');
        let result = obj;
        keys.forEach(key => {
            result = result[key];
        });
        return result;
    } else {
        return obj
    }
}

module.exports = {
    getObjectFromPath
}