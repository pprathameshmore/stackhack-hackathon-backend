//Middleware

const { todoObj } = require('../util/todoObj');

const { response, isDefVar, isDefObj, responsePaging } = require('../util/util');

//Dependency injection for database
const { getAllTodo, saveTodo, getSingleTodo, updateSingleTodo, deleteTodo, deleteTodos } = require('../services/todo/todo');

//Models
const Todo = require('../models/todo');

exports.getAllTodos = async (req, res, next) => {
    try {
        const { search, sort, a = -1, page = 1, limit = 10 } = req.query;

        const currentPage = parseInt(page);
        const pageLimit = parseInt(limit);

        const todoCount = await Todo.estimatedDocumentCount();

        const totalPages = Math.ceil(todoCount / pageLimit);

        if (isDefVar(search)) {
            const foundTodos = await getAllTodo(search, sorting = { sort, a }, paging = { currentPage, pageLimit })
                .catch(err => res.status(500).json(response(500, err, [])));
            return res.status(200).json(responsePaging(200, 'All todo', foundTodos, { currentPage: currentPage, pageLimit: pageLimit, totalPages: totalPages }));

        }

        if (isDefVar(sort)) {
            switch (sort) {
                case 'date':
                    const createdTodos = await getAllTodo(null, sorting = { sort, a }, paging = { currentPage, pageLimit })
                        .catch(err => res.status(500).json(response(500, err, [])));
                    return res.status(200).json(responsePaging(200, 'All todo sorted by date', createdTodos, { currentPage: currentPage, pageLimit: pageLimit, totalPages: totalPages }));

                case 'priority':
                    const priorityTodos = await getAllTodo(null, sorting = { sort, a }, paging = { currentPage, pageLimit })
                        .catch(err => res.status(500).json(response(500, err, [])));
                    return res.status(200).json(responsePaging(200, 'All todo sorted by priority', priorityTodos, { currentPage: currentPage, pageLimit: pageLimit, totalPages: totalPages }));

                case 'label':
                    const labelTodos = await getAllTodo(null, sorting = { sort, a }, paging = { currentPage, pageLimit })
                        .catch(err => res.status(500).json(response(500, err, [])));
                    return res.status(200).json(responsePaging(200, 'All todo sorted by priority', labelTodos, { currentPage: currentPage, pageLimit: pageLimit, totalPages: totalPages }));
            }
        }

        const data = await getAllTodo(null, sorting = { sort, a }, paging = { currentPage, pageLimit })
            .catch(err => res.status(500).json(response(500, err, [])))
        return res.status(200).json(responsePaging(200, 'All todo', data, { currentPage: currentPage, pageLimit: pageLimit, totalPages: totalPages }));

    } catch (error) {
        console.log(error);
    }
}

exports.createTodo = async (req, res, next) => {
    try {

        const { task } = req.body;

        if (isDefVar(task)) {

            const todo = todoObj(req.body);

            await saveTodo(todo).catch(err => res.status(500).json(response(500, err, [])));

            return res.status(200).json(response(200, 'Todo has been saved', []));
        }

        return res.status(400).json(response(400, 'Task can\'t be empty', []));

    } catch (error) {
        console.log(error);
    }
}

exports.getSingleTodo = async (req, res, next) => {
    try {

        const { todo_id } = req.params;

        const data = await getSingleTodo(todo_id).catch(err => res.status(500).json(response(500, err, [])));

        return res.status(200).json(response(200, 'Todo', data));

    } catch (error) {
        console.log(error);
    }
}

exports.updateTodo = async (req, res, next) => {
    try {

        const { todo_id } = req.params;

        if (!isDefObj(req.body)) return res.status(400).json(response(400, 'Body can\'t be empty', []));

        const data = await updateSingleTodo(todo_id, req.body).catch(err => res.status(500).json(response(500, err, [])));

        return res.status(200).json(response(200, 'Todo has been updated', data));


    } catch (error) {
        console.log(error);
    }
}

exports.deleteTodo = async (req, res, next) => {
    try {

        const { todo_id } = req.params;

        const data = await deleteTodo(todo_id).catch(err => res.status(500).json(response(500, err, [])));

        return res.status(200).json(response(200, 'Todo has been deleted', data));

    } catch (error) {
        console.log(error);
    }
}

exports.deleteTodos = async (req, res, next) => {

    await deleteTodos().catch(err => res.status(500).json(response(500, err, [])));
    return res.status(200).json(response(200, 'All Todos has been deleted', []));

}