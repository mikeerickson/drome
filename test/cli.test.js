const { args } = require('../lib/cli');

test('cli.args return task and rest', () => {
    let result = args([
        'node_path',
        'origin_path',
        'task_name',
        'first_arg',
        'second_arg'
    ]);
    expect(result.task).toBe('task_name');
    expect(result.rest.length).toBe(2);
});

test('cli.args contains `--slient`', () => {
    let result = args([
        'node_path',
        'origin_path',
        'test_task',
        '--silent',
    ]);
    expect(result.task).toBe('test_task');
    expect(result.rest).toContain('--silent');
});

test('cli.args contains `-S`', () => {
    let result = args([
        'node_path',
        'origin_path',
        'test_task',
        '-S',
    ]);
    expect(result.task).toBe('test_task');
    expect(result.rest).toContain('-S');
});

test('cli.args contains `silent`', () => {
    let result = args([
        'node_path',
        'origin_path',
        'test_task',
        'silent',
    ]);
    expect(result.task).toBe('test_task');
    expect(result.rest).toContain('silent');
});