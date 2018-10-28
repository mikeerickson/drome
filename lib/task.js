const path = require('path');
const logger = require('./logger');
const { spawn } = require('child_process');
const { sanitizeCommand } = require('./utils');
const { hasOption, init, showHelp, showVersion, showLogs } = require('./cliUtils');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const run = async (cliCommandName, task, name, cliOptions = [], prev) => {
    let result;
    // default to help if nothing is passed to drome
    let cmd = (typeof cliCommandName === 'undefined' || cliCommandName === '') ? 'help' : '';
    if (typeof name === 'undefined' || name === '') {
        cmd = hasOption(cliCommandName, ['-H', '-h', '--help', 'help']) ? 'help' : cmd;
        cmd = hasOption(cliCommandName, ['-I', '-i', '--init', 'init']) ? 'init' : cmd;
        cmd = hasOption(cliCommandName, ['-V', '-v', '--version', 'version']) ? 'version' : cmd;
        cmd = hasOption(cliCommandName, ['-L', '-l', '--logs', 'logs']) ? 'logs' : cmd;
        cmd = hasOption(cliCommandName, ['-D', '-d', '--debug']) ? 'debug' : cmd;
    }

    const silent = hasOption(cliOptions, ['--silent', '-s', '-S', 'silent']);
    const debug = hasOption(cliOptions, ['--debug', '-d', '-D']);

    if (cmd === 'version' || cmd === 'help' || cmd === 'logs' || cmd === 'init') {
        return await cliCommand(cmd);
    }

    if (typeof task != 'undefined') {

        !silent && logger.info(` Start ${name}`);
        let debugMsg = `\ncommand: ${cliCommandName} \nname: ${name} \ntask: ${task}\ncliOptions: ${cliOptions}`;
        debug && logger.debug(` Start ${name}`);
        debug && logger.debug(debugMsg);

        if (typeof task === 'string') {
            debug && logger.debug(` Execute Command Task ${task} `);
            result = await command(task);
        } else if (typeof task === 'function') {
            debug && logger.debug(` Execute Command Function ${task} `);
            result = await func(task, prev);
        } else if (Array.isArray(task)) {
            let sequenceResult;
            await asyncForEach(task, async (subtask, index) => {
                debug && logger.debug(` Execute Sequence ${task}. ${subtask} `);
                sequenceResult = await run('run', subtask, `${name}.${index}`, cliOptions, sequenceResult);
            });
            result = sequenceResult;
        } else {
            let promises = [];
            Object.keys(task).forEach(subtask => {
                debug && logger.debug(` Execute Promise ${task}.${subtask} `);
                promises.push(run('run', task[subtask], `${name}.${subtask}`, cliOptions));
            });
            result = await Promise.all(promises);
        }

        !silent && logger.info(` Finish ${name}`);
        debug && logger.debug(` Finish ${name}`);
    }

    return result;

};

const cliCommand = (cmd) => {
    return new Promise((resolve, reject) => {
        try {
            switch (cmd) {
            case 'help':
                showHelp();
                break;
            case 'version':
                showVersion();
                break;
            case 'logs':
                showLogs();
                break;
            case 'init':
                init();
                break;
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    }).catch(e => {
        console.log(e);
    });
};

const command = task => {
    let [taskProcess, ...args] = task.split(' ');

    return new Promise((resolve, reject) => {
        try {
            let ls = spawn(sanitizeCommand(taskProcess), args, {
                cwd: path.normalize('./'),
                shell: true,
                env: process.env,
                stdio: 'inherit'
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

        if (returnedValue !== undefined) {
            resolve(returnedValue);
        }

    } catch (e) {
        reject(e);
    }
});

module.exports = {
    run,
    command,
    cliCommand,
    func
};