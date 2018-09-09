const drome = require('../lib/drome');

test('Drome run one task', () => {

    let mockTask = jest.fn();

    let config = args => {
        return {
            tasks: {
                test: mockTask
            }
        }
    }

    drome(config, 'test');
    expect(mockTask).toBeCalled();

});

test('Drome run nested task', () => {

    let mockTask = jest.fn();

    let config = args => {
        return {
            tasks: {
                nested: {
                    task: mockTask
                }
            }
        }
    }

    drome(config, 'nested.task');
    expect(mockTask).toBeCalled();

});