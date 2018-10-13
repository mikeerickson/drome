const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();

const getObjectFromPath = (obj, path) => {
    if (path) {
        let keys = path.split('.');
        let result = obj;
        keys.forEach(key => {
            result = result[key];
        });
        return result;
    } else {
        return obj;
    }
};

const sanitizeCommand = command => {

    if (/^@{0,1}[a-zA-Z0-9][a-zA-Z0-9/]+$/.test(command)) {
        try {
            let localMainPath = require.resolve(path.join(process.cwd(), 'node_modules', command));
            return path.resolve(
                localMainPath.substr(0, localMainPath.indexOf('node_modules')),
                'node_modules',
                '.bin',
                command
            );
        } catch (e) {
            return command;
        }
    } else {
        return `"${command}"`;
    }
};

const getTaskList = () => {
    let homeConfig = () => { return { tasks: {} }; };
    let projectConfig = () => { return { tasks: {} }; };

    let homeConfigPath = path.join(homedir, 'drome.config.js');
    if (fs.existsSync(homeConfigPath)) {
        homeConfig = require(homeConfigPath);
    }

    let projectConfigPath = path.join(path.resolve('./'), 'drome.config.js');
    // projectConfigPath = './drome.config.js'; // this is only used when debugging

    if (fs.existsSync(projectConfigPath)) {
        projectConfig = require(projectConfigPath);
    }

    let packageConfig = { scripts: {} };
    const packageFilename = path.join(path.resolve('./'), 'package.json');
    if (fs.existsSync(packageFilename)) {
        packageConfig = require(packageFilename);
    }

    return Object.assign(homeConfig().tasks, projectConfig().tasks, packageConfig.scripts);
};

const wordwrap = (str, maxChars, lineEnd = '\n') => {

    let sum_length_of_words = (word_array) => {
        let out = 0;
        if (word_array.length != 0) {
            for (let i = 0; i < word_array.length; i++) {
                let word = word_array[i];
                out = out + word.length;
            }
        }
        return out;
    };


    let chunkString = (str, length) => {
        return str.match(new RegExp('.{1,' + length + '}', 'g'));
    };

    let splitLongWord = (word, maxChar) => {
        let out = [];
        if (maxChar >= 1) {
            let wordArray = chunkString(word, maxChar - 1);// just one under maxChar in order to add the innerword separator '-'
            if (wordArray.length >= 1) {
                // Add every piece of word but the last, concatenated with '-' at the end
                for (let i = 0; i < (wordArray.length - 1); i++) {
                    let piece = wordArray[i] + '-';
                    out.push(piece);
                }
                // finally, add the last piece
                out.push(wordArray[wordArray.length - 1]);
            }
        }
        // If nothing done, just use the same word
        if (out.length == 0) {
            out.push(word);
        }
        return out;
    };

    let split_out = [[]];
    let split_string = str.split(' ');
    for (let i = 0; i < split_string.length; i++) {
        let word = split_string[i];

        // If the word itself exceed the max length, split it,
        if (word.length > maxChars) {
            let wordPieces = splitLongWord(word, maxChars);
            for (let i = 0; i < wordPieces.length; i++) {
                let wordPiece = wordPieces[i];
                split_out = split_out.concat([[]]);
                split_out[split_out.length - 1] = split_out[split_out.length - 1].concat(wordPiece);
            }

        } else {
            // otherwise add it if possible
            if ((sum_length_of_words(split_out[split_out.length - 1]) + word.length) > maxChars) {
                split_out = split_out.concat([[]]);
            }

            split_out[split_out.length - 1] = split_out[split_out.length - 1].concat(word);
        }
    }

    for (let i = 0; i < split_out.length; i++) {
        split_out[i] = split_out[i].join(' ');
    }

    return split_out.join(lineEnd);
};

const formatDate = (date = '', useAMPM = true) => {
    date = ((date === '') || (date === null)) ? date = new Date() : date;

    // build time
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = '';

    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;


    if (useAMPM) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours < 10 ? '0' + hours : hours;
    }

    let strTime = `${hours}:${minutes}:${seconds} ${ampm}`;

    // build date
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;

    let strDate = `${date.getFullYear()}-${month}-${day}`;
    return `${strDate} ${strTime}`;

};

module.exports = {
    getObjectFromPath,
    sanitizeCommand,
    getTaskList,
    wordwrap,
    formatDate
};