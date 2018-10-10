// Reference:
// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color/41407246#41407246
// console.log(colorCodes.bg.Blue, colorCodes.fg.White, "I am white message with blue background", colorCodes.Reset);

const colorCodes = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',
    fg: {
        Black: '\x1b[30m',
        Red: '\x1b[31m',
        Green: '\x1b[32m',
        Yellow: '\x1b[33m',
        Blue: '\x1b[34m',
        Magenta: '\x1b[35m',
        Cyan: '\x1b[36m',
        White: '\x1b[37m',
        Crimson: '\x1b[38m'
    },
    bg: {
        Black: '\x1b[40m',
        Red: '\x1b[41m',
        Green: '\x1b[42m',
        Yellow: '\x1b[43m',
        Blue: '\x1b[44m',
        Magenta: '\x1b[45m',
        Cyan: '\x1b[46m',
        White: '\x1b[47m',
        Crimson: '\x1b[48m'
    }
};

const colors = {
    red: (str) => {
        return `${colorCodes.fg.Red}${str}${colorCodes.Reset}`;
    },
    green: (str) => {
        return `${colorCodes.fg.Green}${str}${colorCodes.Reset}`;
    },
    blue: (str) => {
        return `${colorCodes.fg.Blue}${str}${colorCodes.Reset}`;
    },
    cyan: (str) => {
        return `${colorCodes.fg.Cyan}${str}${colorCodes.Reset}`;
    },
    yellow: (str) => {
        return `${colorCodes.fg.Yellow}${str}${colorCodes.Reset}`;
    },
    white: (str) => {
        return `${colorCodes.fg.White}${str}${colorCodes.Reset}`;
    },
    magenta: (str) => {
        return `${colorCodes.fg.Magenta}${str}${colorCodes.Reset}`;
    },
    header: (str) => {
        return `${colorCodes.fg.Yellow}${str}${colorCodes.Reset}`;
    }
};

module.exports = { colors, colorCodes };