const express = require('express');
const router = express.Router();

const { getAllTodos, createTodo, getSingleTodo, updateTodo, deleteTodo, deleteTodos } = require('../../controllers/todos');

router.route('/')
    //Get all To-dos
    .get(getAllTodos)
    //Create Todo
    .post(createTodo)
    .delete(deleteTodos);

//Update todo
router.route('/:todo_id')
    //Get single task
    .get(getSingleTodo)
    //Update Todo
    .patch(updateTodo)
    //Delete Todo
    .delete(deleteTodo);

module.exports = router;
