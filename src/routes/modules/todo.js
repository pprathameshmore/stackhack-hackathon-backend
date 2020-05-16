const express = require('express');
const router = express.Router();

const todoController = require('../../controllers/todos');

router.route('/')
    //Get all To-dos
    .get(todoController.getAllTodos)
    //Create Todo
    .post(todoController.createTodo);

//Update todo
router.route('/:todo_id')
    //Get single task
    .get(todoController.getSingleTodo)
    //Update Todo
    .patch(todoController.updateTodo)
    //Delete Todo
    .delete(todoController.deleteTodo);

module.exports = router;
