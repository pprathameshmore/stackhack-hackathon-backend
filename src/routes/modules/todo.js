const express = require('express');
const router = express.Router();

//Middleware


//Callback handler helper
const promiseHandler = require('../../util/promiseHandler');

const { todoObj } = require('../../util/todoObj');

const { response, isDefVar, isDefObj, responsePaging } = require('../../util/util');

//Models
const Todo = require('../../models/todo');

let err = null;
let data = null;

router.route('/')
    //Get all To-dos
    .get(async (req, res, next) => {
        try {

            const { search, sort, a = 1, page = 1, limit = 10 } = req.query;

            const currentPage = parseInt(page);
            const pageLimit = parseInt(limit);

            const todoCount = await Todo.countDocuments();

            const totalPages = Math.ceil(todoCount / pageLimit);

            if (isDefVar(search)) {

                [err, data] = await promiseHandler(Todo.find({ $text: { $search: search } }).
                    skip((pageLimit * currentPage) - pageLimit).
                    limit(pageLimit).sort({ createdAt: -1 }));

                if (err) return res.status(500).json(response(500, err, []));
                return res.status(200).json(responsePaging(200, 'All todo', data, { currentPage: currentPage, pageLimit: pageLimit, totalPages: totalPages }));
            }
            console.log(sort);
            if (isDefVar(sort)) {
                switch (sort) {
                    case 'date':
                        [err, data] = await promiseHandler(Todo.find().
                            sort({ createdAt: a }).
                            skip((pageLimit * currentPage) - pageLimit).
                            limit(pageLimit));
                        return res.status(200).json(responsePaging(200, 'All todo sorted by date', data, { currentPage: currentPage, pageLimit: pageLimit, totalPages: totalPages }));

                    case 'priority':
                        [err, data] = await promiseHandler(Todo.find()
                            .sort({ priority: a }).
                            skip((pageLimit * currentPage) - pageLimit).
                            limit(pageLimit));
                        return res.status(200).json(responsePaging(200, 'All todo sorted by priority', data, { currentPage: currentPage, pageLimit: pageLimit, totalPages: totalPages }));

                    case 'label':
                        [err, data] = await promiseHandler(Todo.find()
                            .sort({ label: a }).
                            skip((pageLimit * currentPage) - pageLimit).
                            limit(pageLimit));
                        return res.status(200).json(responsePaging(200, 'All todo sorted by label', data, { currentPage: currentPage, pageLimit: pageLimit, totalPages: totalPages }));
                }
            }

            [err, data] = await promiseHandler(Todo.find().
                skip((pageLimit * currentPage) - pageLimit).
                limit(pageLimit).sort({ createdAt: -1 })
            );

            if (err) return res.status(500).json(response(500, err, []));

            return res.status(200).json(responsePaging(200, 'All todo', data, { currentPage: currentPage, pageLimit: pageLimit, totalPages: totalPages }));

        } catch (error) {
            console.log(error);
        }
    })
    //Create Todo
    .post(async (req, res, next) => {
        try {

            const { task } = req.body;

            if (isDefVar(task)) {

                const todo = todoObj(req.body);
                [err, data] = await promiseHandler(todo.save());

                if (err) return res.status(500).json(response(500, err, []));

                return res.status(200).json(response(200, 'All todo', data));
            }

            return res.status(400).json(response(400, 'Task can\'t be empty', []));

        } catch (error) {
            console.log(error);
        }
    });

//Update todo
router.route('/:todo_id')
    //Get single task
    .get(async (req, res, next) => {
        try {

            const { todo_id } = req.params;

            [err, data] = await promiseHandler(Todo.findById(todo_id).exec());

            if (err) return res.status(500).json(response(500, err, []));

            return res.status(200).json(response(200, 'Todo', data));

        } catch (error) {
            console.log(error);
        }
    }).patch(async (req, res, next) => {
        try {

            const { todo_id } = req.params;

            if (!isDefObj(req.body)) return res.status(400).json(response(400, 'Body can\'t be empty', []));

            [err, data] = await promiseHandler(Todo.findByIdAndUpdate(todo_id, req.body).exec());

            if (err) return res.status(500).json(response(500, err, []));

            return res.status(200).json(response(200, 'Todo has been updated', data));


        } catch (error) {
            console.log(error);
        }
    }).delete(async (req, res, next) => {
        try {

            const { todo_id } = req.params;

            [err, data] = await promiseHandler(Todo.findByIdAndDelete(todo_id).exec());

            if (err) return res.status(500).json(response(500, err, []));

            return res.status(200).json(response(200, 'Todo has been deleted', data));

        } catch (error) {
            console.log(error);
        }
    });

module.exports = router;
