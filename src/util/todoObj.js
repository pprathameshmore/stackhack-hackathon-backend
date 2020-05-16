const Todo = require('../models/todo');

function todoObj(todoObject) {
    return todo = new Todo({
        task: todoObject.task,
        label: todoObject.label,
        progress: todoObject.progress,
        isImportant: todoObject.isImportant,
        priority: todoObject.priority
    });
}

exports.todoObj = todoObj;