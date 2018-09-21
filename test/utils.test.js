const { sanitizeCommand } = require('../lib/utils');
const path = require('path');

describe('sanitizeCommand()', () => {

    test('should recognize string as not installed localy package', () => {
        /**
         * It's important to use here dependency which is not used in this project
         */
        expect(sanitizeCommand('@babel')).toBe('@babel');
        expect(sanitizeCommand('@babel/cli')).toBe('@babel/cli');
    });

    test('should recognize string as installed localy package', () => {
        expect(sanitizeCommand('jest')).toBe(path.resolve(
            require.resolve('jest').split('node_modules')[0],
            'node_modules',
            '.bin',
            'jest'
        ));
    });

    test('should recognize string as not package', () => {
        expect(sanitizeCommand('.test')).toBe('".test"');
        expect(sanitizeCommand('@.test')).toBe('"@.test"');
        expect(sanitizeCommand('@/test')).toBe('"@/test"');
        expect(sanitizeCommand('./path/to/file')).toBe('"./path/to/file"');
    });

});

