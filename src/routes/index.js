const express = require('express');
const router = express.Router();

const todoRouter = require('./modules/todo');
const authRouter = require('./modules/user');

const { isAuthenticated } = require('../middlewares/authCheck');

router.use('/api/v1/todo', isAuthenticated, todoRouter);
router.use('/api/v1/auth', authRouter);

module.exports = router;
