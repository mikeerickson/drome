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

test('Drome handle undefined task', () => {

    let mockTask = jest.fn();

    let config = () => {
        return {
            tasks: {
                test: mockTask
            }
        };
    };

    return drome(config, 'run', 'undefinedTask').catch(e => {
        expect(e).toBe('Task \'undefinedTask\' is not defined');
    });
    
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
                parallel: {
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
                        }, 500);
                    },
                    third: next => {
                        setTimeout(() => {
                            mockTask3();
                            order.push(3);
                            next();
                        }, 1000);
                    }
                }
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

test('Drome run async tasks in sequence', () => {

    let order = [];

    let mockTask1 = jest.fn();
    let mockTask2 = jest.fn();
    let mockTask3 = jest.fn();

    let config = () => {
        return {
            tasks: {
                sequence: [
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
                        }, 1000);
                    },
                    next => {
                        setTimeout(() => {
                            mockTask3();
                            order.push(3);
                            next();
                        }, 500);
                    }
                ]
            }
        };
    };

    return drome(config, 'sequence').then(() => {
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
                firstLevel: {
                    first: {
                        subfirst: next => {
                            setTimeout(() => {
                                mockTask1();
                                order.push(1);
                                next();
                            }, 500);
                        },
                        subsecond: next => {
                            setTimeout(() => {
                                mockTask2();
                                order.push(2);
                                next();
                            }, 2000);
                        }
                    },
                    second: next => {
                        setTimeout(() => {
                            mockTask3();
                            order.push(3);
                            next();
                        }, 1000);
                    }
                }
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

test('Drome should allow passing result to the next task in sequence', () => {

    let result = 0;

    let config = () => {
        return {
            tasks: {
                sequence: [
                    () => {
                        return 1;
                    },
                    (next, prev) => {
                        setTimeout(() => {
                            next(prev + 1);
                        }, 1000);
                        return prev + 2;
                    },
                    (next, prev) => {
                        setTimeout(() => {
                            result = prev * 3;
                            next(prev);
                        }, 500);
                    }
                ]
            }
        };
    };

    return drome(config, 'sequence').then(() => {
        expect(result).toBe(9);
    });

});