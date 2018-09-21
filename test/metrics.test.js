const { timer } = require('../lib/metrics');

describe('timer()', () => {
    test('should return time in miliseconds', () => {
        let time = timer();

        return new Promise((resolve) => {
            setTimeout(() => {
                expect(Number.isInteger(time())).toBeTruthy();
                resolve();
            }, 100);
        });
    });

    test('should return time in pretty string', () => {
        let time = timer();

        return new Promise((resolve) => {
            setTimeout(() => {
                expect(Number.isInteger(time(true))).toBeFalsy();
                expect(/[0-9]{1,3}ms/.test(time(true))).toBeTruthy();
                resolve();
            }, 100);
        });

    });

});