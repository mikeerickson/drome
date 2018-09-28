
const args = (argv) => {
    let [cmd, task, ...rest] = argv.slice(2);
    if (task.indexOf('-') !== -1) {
        rest.push(task);
        task = '';
    }
    return {
        cmd,
        task,
        rest
    };
};

module.exports = {
    args
};
