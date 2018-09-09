const args = (argv) => {
    let [task, ...rest] = argv.slice(2);
    return {
        task,
        rest
    };
};

module.exports = {
    args
};