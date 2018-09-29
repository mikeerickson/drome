
const { dd } = require('dumper.js');

const args = (argv) => {
    let [cmd, task, ...rest] = argv.slice(2);
    cmd = (typeof cmd === 'undefined') ? '' : cmd;
    task = (typeof task === 'undefined') ? '' : task;

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
