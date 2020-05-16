const express = require('express');
const router = express.Router();

const todoRouter = require('./modules/todo');

router.use('/api/todo', todoRouter);

module.exports = router;
