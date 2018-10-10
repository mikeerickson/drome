const path = require('path');
const fs = require('fs');

const BASH_LOCATION = path.join(process.env.HOME, '.bashrc');
const FISH_LOCATION = path.join(process.env.HOME, '.config/fish/config.fish');
const ZSH_LOCATION = path.join(process.env.HOME, '.zshrc');
// const COMPLETION_DIR = path.join(process.env.HOME, '.config/tabtab');
// const TABTAB_SCRIPT_NAME = '__tabtab';

const systemShell = () => (process.env.SHELL || '').split('/').slice(-1)[0];

const commands = [
    'run',
    'version',
    'help'
];

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

const install = () => {
    // Installing completion should be here
    let scriptname = path.join(process.env.HOME, '.drome', `drome.${systemShell()}`);
    let script = getScript();
    let location = getLocation();
    let sourceLine = shellSourceLine(scriptname);

    console.log(scriptname);
    console.log(script);
    console.log(location);
    console.log(sourceLine);

    // Add to shell config
    // if(!fs.existsSync(path.join(location))) {
    //     fs.mkdirSync(path.join(location));
    // }

    const stream = fs.createWriteStream(location, { flags: 'a' });
    // stream.on('error', reject);
    // stream.on('finish', () => resolve());

    stream.write('\n# drome source');

    stream.write('\n# uninstall by removing these lines');
    stream.write(`\n${sourceLine}`);
    stream.end('\n');

    console.log('=> Added drome source line in "%s" file', location);

    fs.readFile(script, 'utf8', (err, fileContent) => {
        if(err) {
            return console.log(err);
        }
        if(!fs.existsSync(path.join(process.env.HOME, '.drome'))) {
            fs.mkdirSync(path.join(process.env.HOME, '.drome'));
        }
        fs.writeFile(scriptname, fileContent, {encoding: 'utf8'}, err => {
            if(err) {
                return console.log(err);
            }
        });
    });

};

const print = ({rest, config}) => {
    if(rest[0] == 'run') {

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
                if(!rest[1]) {
                    return true;
                } else {
                    return task.indexOf(rest[1]) == 0;
                }
            })
            .forEach(task => console.log(task));

    } else {
        commands
            .filter(command => command.indexOf(rest[0]) == 0)
            .forEach(command => console.log(command));
    }
};

module.exports = {
    install,
    print
};