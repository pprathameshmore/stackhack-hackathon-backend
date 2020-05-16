const express = require('express');
const router = express.Router();

//Middleware


//Callback handler helper
const promiseHandler = require('../../util/promiseHandler');

const { todoObj } = require('../../util/todoObj');

const { response, isDefVar, isDefObj } = require('../../util/util');

//Models
const Todo = require('../../models/todo');

let err = null;
let data = null;

router.route('/')
    //Get all To-dos
    .get(async (req, res, next) => {
        try {
            [err, data] = await promiseHandler(Todo.find().exec());

            if (err) return res.status(500).json(response(500, err, []));

            return res.status(200).json(response(200, 'All todo', data));

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
