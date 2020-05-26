//Dependency Injection
const Todo = require('../../models/todo');

const getAllTodo = async (search, sorting = { sort, a }, paging = { page: 1, limit: 10 }) => {

    switch (sorting.sort) {
        case 'date':
            return await Todo.find(search ? { $text: { $search: search } } : {}).skip((paging.limit * paging.page) - paging.limit).
                limit(paging.limit).sort({ createdAt: sorting.a });

        case 'priority':
            return await Todo.find(search ? { $text: { $search: search } } : {}).skip((paging.limit * paging.page) - paging.limit).
                limit(paging.limit).sort({ priority: sorting.a });

        case 'label':
            return await Todo.find(search ? { $text: { $search: search } } : {}).skip((paging.limit * paging.page) - paging.limit).
                limit(paging.limit).sort({ label: sorting.a });

        default:
            return await Todo.find(search ? { $text: { $search: search } } : {}).skip((paging.limit * paging.page) - paging.limit).
                limit(paging.limit).sort({ createdAt: sorting.a });
    }
}

const saveTodo = async (todo) => {
    return await todo.save();
}

const getSingleTodo = async (todoId) => {
    return await Todo.findById(todoId);
}

const updateSingleTodo = async (todoId, data) => {
    return await Todo.findByIdAndUpdate(todoId, data);
}

const deleteTodo = async (todoId) => {
    return await Todo.findByIdAndDelete(todoId);
}

const deleteTodos = async () => {
    return await Todo.remove({});
}

exports.getAllTodo = getAllTodo;
exports.saveTodo = saveTodo;
exports.getSingleTodo = getSingleTodo;
exports.updateSingleTodo = updateSingleTodo;
exports.deleteTodo = deleteTodo;
exports.deleteTodos = deleteTodos;