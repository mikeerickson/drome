const args = argv => {
    let [cmd, task, ...rest] = argv.slice(2);
    cmd = typeof cmd === 'undefined' ? '' : cmd;
    task = typeof task === 'undefined' ? '' : task;

    // check if options have been supplied
    if (task[0] === '-') {
        rest.push(task);
        task = '';
    }

    rest = rest.filter(e => e !== '--');

    return {
        cmd,
        task,
        rest
    };
};

module.exports = {
    args
};
