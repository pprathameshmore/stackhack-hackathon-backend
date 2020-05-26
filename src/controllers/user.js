const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { checkUser, createUser } = require('../services/user/user');

const { isDefVar, response } = require('../util/util');

exports.signupUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const _user = new User();

        if (isDefVar(email) && isDefVar(password)) {
            const userFound = await checkUser(email);
            if (userFound) return res.status(409).json(response(409, 'User already exists', null));
            const userCreated = await createUser(email, await _user.hashPassword(password)).catch(error => res.status(500).json(response(500, error, null)));
            return res.status(201).json(response(201, 'User has been created', userCreated));
        }
        return res.status(404).json(response(404, 'Body can\'t be empty', null));

    } catch (error) {
        console.error(error);
    }
}
exports.signinUser = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (isDefVar(email) && isDefVar(password)) {
            const foundUser = await checkUser(email);
            if (!foundUser) return res.status(401).json(response(401, 'Email or password incorrect', null));
            const isAuthenticated = await bcrypt.compare(password, foundUser.password);
            if (!isAuthenticated) return res.status(401).json(response(401, 'Email or password incorrect', null));
            const token = jwt.sign(
                { userId: foundUser._id, email: foundUser.email, createdAt: Date.now },
                'thisisworstcodeintheworld', {
                expiresIn: '24h'
            });
            const sendToken = { user: foundUser._id, token: token, warning: 'Keep it safe! Do not store in LocalStorage of Browser' }
            return res.status(200).json(response(200, 'You are authenticated successfully', sendToken));
        }
    } catch (error) {
        console.log(error);
    }
}