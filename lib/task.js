const { spawn } = require('child_process');
const path = require('path');
const { sanitizeCommand, hasOption } = require('./utils');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const run = async (task, name, cliOptions = [], prev) => {

    let result;
    const silent = hasOption(cliOptions, ['--silent', '-S', 'silent']);

    !silent && console.log(`Started task ${name}`);

    if (typeof task === 'string') {
        result = await command(task);
    } else if (typeof task === 'function') {
        result = await func(task, prev);
    } else if (Array.isArray(task)) {
        let sequenceResult;
        await asyncForEach(task, async (subtask, index) => {
            sequenceResult = await run(subtask, `${name}.${index}`, cliOptions, sequenceResult);
        });
        result = sequenceResult;
    } else {
        let promises = [];
        Object.keys(task).forEach(subtask => {
            promises.push(run(task[subtask], `${name}.${subtask}`, prev));
        });
        result = await Promise.all(promises);
    }

    !silent && console.log(`Finished task ${name}`);

    return result;

};

const command = task => {
    let [taskProcess, ...args] = task.split(' ');

    return new Promise((resolve, reject) => {
        try {
            let ls = spawn(sanitizeCommand(taskProcess), args, {
                cwd: path.normalize('./'),
                shell: true,
                env: process.env
            });

            ls.stdout.on('data', data => {
                process.stdout.write(data.toString());
            });

            ls.stderr.on('data', (data) => {
                process.stdout.write(data.toString());
            });

            ls.on('close', code => {
                resolve(code);
            });

            ls.on('error', (code) => {
                console.log(`child process exited with code ${code}`);
                reject(code);
            });
        } catch (e) {
            reject(e);
        }
    }).catch(e => {
        console.log(e);
    });

};

const func = (task, prev) => new Promise((resolve, reject) => {
    try {

        let returnedValue = task(result => {
            resolve(result);
        }, prev);

        if(returnedValue !== undefined) {
            resolve(returnedValue);
        }

    } catch (e) {
        reject(e);
    }
});

module.exports = {
    run,
    command,
    func
};