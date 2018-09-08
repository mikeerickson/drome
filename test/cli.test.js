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