const commands = [
    {
        name: 'help',
        command: '',
        alias: ['help', '--help', '-H'],
        type: 'boolean',
        description: 'Displays help information for available commands'
    },
    {
        name: 'version',
        command: '',
        alias: ['version', '--version', '-V'],
        type: 'boolean',
        description: 'Displays version information'
    }
];

module.exports = commands;