//Dependency Injection
const Todo = require('../../models/todo');

const getAllTodo = async (user, search, sorting = { sort, a }, paging = { page: 1, limit: 10 }) => {

    switch (sorting.sort) {
        case 'date':
            return await Todo.find(search ? { $and: [{ $text: { $search: search } }, { user: user }] } : { user: user }).skip((paging.limit * paging.page) - paging.limit).
                limit(paging.limit).sort({ createdAt: sorting.a });

        case 'priority':
            return await Todo.find(search ? { $and: [{ $text: { $search: search } }, { user: user }] } : { user: user }).skip((paging.limit * paging.page) - paging.limit).
                limit(paging.limit).sort({ priority: sorting.a });

        case 'label':
            return await Todo.find(search ? { $and: [{ $text: { $search: search } }, { user: user }] } : { user: user }).skip((paging.limit * paging.page) - paging.limit).
                limit(paging.limit).sort({ label: sorting.a });

        default:
            return await Todo.find(search ? { $and: [{ $text: { $search: search } }, { user: user }] } : { user: user }).skip((paging.limit * paging.page) - paging.limit).
                limit(paging.limit).sort({ createdAt: sorting.a });
    }
}

const saveTodo = async (todo) => {
    return await todo.save();
}

const getSingleTodo = async (user, todoId) => {
    return await Todo.findOne({ $and: [{ _id: todoId }, { user: user }] });
}

const updateSingleTodo = async (user, todoId, data) => {
    return await Todo.findOneAndUpdate({ $and: [{ _id: todoId }, { user: user }] }, data);
}

const deleteTodo = async (user, todoId) => {
    return await Todo.findOneAndRemove({ $and: [{ _id: todoId }, { user: user }] });
}

const deleteTodos = async (user) => {
    return await Todo.remove({ user: user });
}

exports.getAllTodo = getAllTodo;
exports.saveTodo = saveTodo;
exports.getSingleTodo = getSingleTodo;
exports.updateSingleTodo = updateSingleTodo;
exports.deleteTodo = deleteTodo;
exports.deleteTodos = deleteTodos;