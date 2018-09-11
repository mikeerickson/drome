const drome = require('../lib/drome');

let oldConsoleLog = console.log;

beforeAll(() => {
    console.log = jest.fn();
});

afterAll(() => {
    console.log = oldConsoleLog;
});

test('Drome run one task', () => {

    let mockTask = jest.fn();

    let config = () => {
        return {
            tasks: {
                test: mockTask
            }
        };
    };

    drome(config, 'test');
    expect(mockTask).toBeCalled();

});

test('Drome run nested task', () => {

    let mockTask = jest.fn();

    let config = () => {
        return {
            tasks: {
                nested: {
                    task: mockTask
                }
            }
        };
    };

    drome(config, 'nested.task');
    expect(mockTask).toBeCalled();

});

test('Drome run async parallel tasks', () => {

    let order = [];

    let mockTask1 = jest.fn();
    let mockTask2 = jest.fn();
    let mockTask3 = jest.fn();

    let config = () => {
        return {
            tasks: {
                parallel: [
                    next => {
                        setTimeout(() => {
                            mockTask1();
                            order.push(1);
                            next();
                        }, 2000);
                    },
                    next => {
                        setTimeout(() => {
                            mockTask2();
                            order.push(2);
                            next();
                        }, 500);
                    },
                    next => {
                        setTimeout(() => {
                            mockTask3();
                            order.push(3);
                            next();
                        }, 1000);
                    }
                ]
            }
        };
    };

    return drome(config, 'parallel').then(() => {
        expect(mockTask1).toBeCalled();
        expect(mockTask2).toBeCalled();
        expect(mockTask3).toBeCalled();
        expect(order).toEqual([2, 3, 1]);
    });
    
});

test('Drome run async tasks step by step', () => {

    let order = [];

    let mockTask1 = jest.fn();
    let mockTask2 = jest.fn();
    let mockTask3 = jest.fn();

    let config = () => {
        return {
            tasks: {
                stepByStep: {
                    first: next => {
                        setTimeout(() => {
                            mockTask1();
                            order.push(1);
                            next();
                        }, 2000);
                    },
                    second: next => {
                        setTimeout(() => {
                            mockTask2();
                            order.push(2);
                            next();
                        }, 1000);
                    },
                    third: next => {
                        setTimeout(() => {
                            mockTask3();
                            order.push(3);
                            next();
                        }, 500);
                    }
                }
            }
        };
    };

    return drome(config, 'stepByStep').then(() => {
        expect(mockTask1).toBeCalled();
        expect(mockTask2).toBeCalled();
        expect(mockTask3).toBeCalled();
        expect(order).toEqual([1, 2, 3]);
    });

});

test('Drome run parallel - task and step by step stage', () => {

    let order = [];

    let mockTask1 = jest.fn();
    let mockTask2 = jest.fn();
    let mockTask3 = jest.fn();

    let config = () => {
        return {
            tasks: {
                firstLevel: [
                    {
                        first: next => {
                            setTimeout(() => {
                                mockTask1();
                                order.push(1);
                                next();
                            }, 500);
                        },
                        second: next => {
                            setTimeout(() => {
                                mockTask2();
                                order.push(2);
                                next();
                            }, 1000);
                        }
                    },
                    next => {
                        setTimeout(() => {
                            mockTask3();
                            order.push(3);
                            next();
                        }, 1000);
                    }
                ]
            }
        };
    };

    return drome(config, 'firstLevel').then(() => {
        expect(mockTask1).toBeCalled();
        expect(mockTask2).toBeCalled();
        expect(mockTask3).toBeCalled();
        expect(order).toEqual([1, 3, 2]);
    });

});