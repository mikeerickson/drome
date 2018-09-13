const { spawn } = require('child_process');
const path = require('path');
const { sanitizeCommand } = require('./utils');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const run = async (task, name) => {

    console.log(`Started task ${name}`);

    if (typeof task === 'string') {
        await command(task);
    } else if (typeof task === 'function') {
        if (task.length > 0) {
            await async(task);
        } else {
            await sync(task);
        }
    } else if (Array.isArray(task)) {
        await asyncForEach(task, async (subtask, index) => {
            await run(subtask, `${name}.${index}`);
        });
    } else {
        let promises = [];
        Object.keys(task).forEach(subtask => {
            promises.push(run(task[subtask], `${name}.${subtask}`));
        });
        await Promise.all(promises);
    }

    console.log(`Finished task ${name}`);

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
                reject(`child process exited with code ${code}`);
            });
        } catch(e) {
            reject(e);
        }
    }).catch(e => {
        console.log(e);
    });

};

const sync = task => new Promise((resolve, reject) => {
    try {
        task();
        resolve();
    } catch (e) {
        reject(e);
    }
});

const async = task => new Promise((resolve, reject) => {
    try {
        task(() => {
            resolve();
        });
    } catch (e) {
        reject(e);
    }
});

module.exports = {
    run,
    command,
    sync,
    async
};