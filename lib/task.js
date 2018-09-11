const { spawn } = require('child_process');
const path = require('path');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

const run = async (task, name) => {

    console.log(`Started task ${name}`);

    if (typeof task === 'string') {
        await command(task);
    } else if (typeof task === 'function') {
        if (task.length > 0) {
            await async(task)
        } else {
            await sync(task);
        }
    } else if (Array.isArray(task)) {
        let promises = [];
        task.forEach((subtask, index) => {
            promises.push(run(subtask, `${name}.${index}`));
        })
        await Promise.all(promises);
    } else {
        await asyncForEach(Object.keys(task), async key => {
            await run(task[key], `${name}.${key}`)
        })
    }

    console.log(`Finished task ${name}`);

}

const command = task => {
    let [process, ...args] = task.split(' ');

    return new Promise((resolve, reject) => {
        try {
            let ls = spawn(process, args, {
                cwd: path.normalize('./')
            });

            ls.stdout.on('data', data => {
                console.log(data.toString());
            });

            ls.stderr.on('data', (data) => {
                console.log(`\x1b[31m${data}\x1b[0m`);
            });

            ls.on('close', (code) => {
                resolve();
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
    })

}

const sync = task => new Promise((resolve, reject) => {
    try {
        task();
        resolve();
    } catch (e) {
        reject(e);
    }
})

const async = task => new Promise((resolve, reject) => {
    try {
        task(() => {
            resolve();
        });
    } catch (e) {
        reject(e);
    }
})

module.exports = {
    run,
    command,
    sync,
    async
}