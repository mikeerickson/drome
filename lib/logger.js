const fs = require('fs');
const path = require('path');
const { colors } = require('./colors');
const { formatDate } = require('./utils');

const ts = formatDate(new Date()); // yyyy-MM-dd HH:mm:ss

const logToFile = (msgType, msg) => {
    let data = `${ts} ${msgType.toUpperCase()} ${msg}\n`;
    let logFile = path.join(path.relative(__dirname, './'), 'drome.log');
    fs.appendFile(logFile, data, (err) => {
        if (err) throw err;
    });
};

const log = (msgType = 'log', msg = '', logFile = true) => {
    switch (msgType.toLowerCase()) {
    case 'log':
        console.log(`[${ts}] ${msg}`); break;
    case 'info':
        console.log(colors.blue(`[${ts}] ${msg}`)); break;
    case 'success':
        console.log(colors.green(`[${ts}] ${msg}`)); break;
    case 'warn':
        console.log(colors.yellow(`[${ts}] ${msg}`)); break;
    case 'error':
        console.log(colors.red(`[${ts}] ${msg}`)); break;
    case 'header':
        console.log(colors.magenta(`[${ts}] ${msg}`)); break;
    case 'footer':
        console.log(colors.magenta(`[${ts}] ${msg}`)); break;
    default:
        console.log(`[${ts}] ${msg}`); break;
    }
    logFile && logToFile(msgType, msg);
};

const logger = {
    file: msg => { logToFile(msg); },
    log: msg => { log('log', msg); },
    info: msg => { log('info', msg); },
    success: msg => { log('success', msg); },
    warn: msg => { log('warn', msg); },
    error: msg => { log('error', msg); },
    header: msg => { log('header', msg); },
    footer: msg => { log('footer', msg); }
};

module.exports = logger;