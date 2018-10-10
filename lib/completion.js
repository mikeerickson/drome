const path = require('path');
const fs = require('fs');

const BASH_LOCATION = '~/.bashrc';
const FISH_LOCATION = '~/.config/fish/config.fish';
const ZSH_LOCATION = '~/.zshrc';

const systemShell = () => (process.env.SHELL || '').split('/').slice(-1)[0];

// Available commands
const commands = [
    'run',
    'version',
    'help'
];

// Get script with default completion shell logic
const getScript = () => {
    switch(systemShell()) {
    case 'fish':
        return 'scripts/completion/fish.sh';
    case 'zsh':
        return 'scripts/completion/zsh.sh';
    default:
        return 'scripts/completion/bash.sh';
    }
};

// Get location of shell config
const getLocation = () => {
    switch(systemShell()) {
    case 'fish':
        return FISH_LOCATION;
    case 'zsh':
        return ZSH_LOCATION;
    default:
        return BASH_LOCATION;
    }
};

// Get extension for completion shell script
const getExtension = () => {
    switch(systemShell()) {
    case 'fish':
        return 'fish';
    case 'zsh':
        return 'zsh';
    default:
        return 'bash';
    }
};


// Get source line for shell
const shellSourceLine = scriptname => {
    switch(systemShell()) {
    case 'fish':
        return `[ -f ${scriptname} ]; and . ${scriptname}; or true`;
    case 'zsh':
        return `[[ -f ${scriptname} ]] && . ${scriptname} || true`;
    default:
        return `[ -f ${scriptname} ] && . ${scriptname} || true`;
    }
};

// Install process
const install = () => {

    let script = getScript();
    let location = getLocation();
    let scriptname = `~/.drome/drome.${getExtension()}`;
    let absoluteScriptname = path.join(process.env.HOME, '.drome', `drome.${getExtension()}`);
    let sourceLine = shellSourceLine(scriptname);

    if(fs.existsSync(path.join(process.env.HOME, location.replace('~/', '')))) {
        let filecontent = fs.readFileSync(path.join(process.env.HOME, location.replace('~/', '')), 'utf8');
        if(filecontent.match(sourceLine)) {
            return true;
        }
    }

    const stream = fs.createWriteStream(path.join(process.env.HOME, location.replace('~/', '')), { flags: 'a' });

    stream.write('\n# drome source');

    stream.write('\n# uninstall by removing these lines');
    stream.write(`\n${sourceLine}`);
    stream.end('\n');

    fs.readFile(script, 'utf8', (err, fileContent) => {
        if(err) {
            return console.log(err);
        }
        if(!fs.existsSync(path.join(process.env.HOME, '.drome'))) {
            fs.mkdirSync(path.join(process.env.HOME, '.drome'));
        }
        fs.writeFile(absoluteScriptname, fileContent, {encoding: 'utf8'}, err => {
            if(err) {
                return console.log(err);
            }
        });
    });

};

const uninstall = () => {
    // Uninstall logic should be here

    let absoluteScriptname = path.join(process.env.HOME, '.drome', `drome.${getExtension()}`);

    fs.unlink(absoluteScriptname, err => {
        if(err) {
            return console.log(err);
        }
    });

};

// Completion printing
const print = ({rest, config}) => {
    if(rest[1] == 'run') {

        // Not the best because recursive but works for now
        let getTaskNames = (source, prefix = null) => {
            let result = Object.keys(source).reduce((names, task) => {
                if(typeof source[task] !== 'string' && typeof source[task] !== 'function') {
                    return names.concat([`${ prefix ? `${prefix}.`: ''}${task}`])
                        .concat(getTaskNames(source[task], `${ prefix ? `${prefix}.`: ''}${task}`));
                } else {
                    return names.concat([`${ prefix ? `${prefix}.`: ''}${task}`]);
                }
            }, []);
            return result;
        };

        getTaskNames(config.tasks)
            .filter(task => {
                if(!rest[2]) {
                    return true;
                } else {
                    return task.indexOf(rest[2]) == 0;
                }
            })
            .forEach(task => console.log(task));

    } else {
        commands
            .filter(command => command.indexOf(rest[1]) == 0)
            .forEach(command => console.log(command));
    }
};

module.exports = {
    install,
    uninstall,
    print
};