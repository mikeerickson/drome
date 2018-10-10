const path = require('path');

const BASH_LOCATION = path.join(process.env.HOME, '.bashrc');
const FISH_LOCATION = path.join(process.env.HOME, '.config/fish/config.fish');
const ZSH_LOCATION = path.join(process.env.HOME, '.zshrc');
const COMPLETION_DIR = path.join(process.env.HOME, '.config/tabtab');
const TABTAB_SCRIPT_NAME = '__tabtab';

const systemShell = () => (process.env.SHELL || '').split('/').slice(-1)[0];

switch(systemShell()) {
case 'fish':
    console.log('fish shell');
    break;
case 'zsh':
    console.log('zsh shell');
    break;
default:
    console.log('bash shell');
    break;
}

const commands = [
    'run',
    'rumcajs',
    'version',
    'help'
];

const install = () => {
    // Installing completion should be here
};

const print = ({cmd, task, rest, config}) => {
    // console.log('COMPLETE RESULT:', cmd, task, rest, config);
    if(rest[0] == 'run') {
        
        console.log('COMPLETE TASK NAME');
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