const command = task => {
    let [process, ...args] = task.split(' ');

    return new Promise((resolve, reject) => {
        let ls = spawn(process, args, {
            cwd: path.normalize('./')
        });

        ls.stdout.on('data', (data) => {
            ui.print(data);
        });

        ls.stderr.on('data', (data) => {
            ui.print(`\x1b[31m${data}\x1b[0m`);
        });

        ls.on('close', (code) => {
            resolve();
        });

        ls.on('error', (code) => {
            console.log(`child process exited with code ${code}`);
            reject(`child process exited with code ${code}`);
        });
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