const { spawn } = require('child_process');
const path = require('path');

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
    command,
    sync,
    async
}