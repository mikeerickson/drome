const path = require('path');
const { colors } = require('./colors');
const fs = require('fs');

const ts = new Date().toISOString();

const logToFile = (msg) => {
    let data = `[${ts}] ${msg}\n`;
    let logFile = path.join(path.relative(__dirname, './'), 'drome.log');
    fs.appendFile(logFile, data, (err) => {
        if (err) throw err;
    });
};

const logger = {
    file: (msg) => { logToFile(msg); },
    log: (msg, options = { logFile: true }) => { console.log(`[${ts}] ${msg}`); options.logFile && logToFile(msg); },
    info: (msg, options = { logFile: true }) => { console.log(colors.blue(`[${ts}] ${msg}`)); logToFile(msg); },
    success: (msg, options = { logFile: true }) => { console.log(colors.green(`[${ts}] ${msg}`)); logToFile(msg); },
    warn: (msg, options = { logFile: true }) => { console.log(colors.yellow(`[${ts}] ${msg}`)); logToFile(msg); },
    error: (msg, options = { logFile: true }) => { console.log(colors.red(`[${ts}] ${msg}`)); logToFile(msg); }
};

module.exports = logger;