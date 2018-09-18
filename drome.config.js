module.exports = () => {
    return {
        tasks: {
            install: 'npm install',
            test: {
                unit: './node_modules/.bin/jest --color',
                lint: './node_modules/.bin/eslint {bin,lib,test}/**/*.js'
            }
        }
    };
};