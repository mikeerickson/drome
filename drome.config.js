module.exports = () => {
    return {
        tasks: {
            install: 'npm install',
            test: {
                unit: 'jest --color',
                lint: 'eslint {bin,lib,test}/**/*.js'
            }
        }
    };
};