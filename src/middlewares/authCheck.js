const jwt = require('jsonwebtoken');

const { response } = require('../util/util');

const isAuthenticated = async (req, res, next) => {
    try {
        const getToken = req.headers.authorization.split(" ")[1];
        req.userRef = jwt.verify(getToken, 'thisisworstcodeintheworld');
        next();
    } catch (error) {
        return res.status(403).json(response(403, 'Please Signin to access this route', null));
    }
}

exports.isAuthenticated = isAuthenticated;
