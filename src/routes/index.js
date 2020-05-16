const express = require('express');
const router = express.Router();

const todoRouter = require('./modules/todo');

router.use('/api/v1/todo', todoRouter);

module.exports = router;
