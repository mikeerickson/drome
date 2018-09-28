// drome global task, available for all projects
// project specific tasks with same name will take precedence

const globalTasks = {
    'global': 'echo \'Drome Global Task\''
};

module.exports = () => {
    return {
        tasks: globalTasks
    };
};
