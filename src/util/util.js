const Todo = require('../models/todo');


/* Generate response */
function response(statusCode, message, data) {
    return {
        statusCode: statusCode,
        message: message,
        data: data
    };
}

exports.response = response;

/* Validate */
function isDefObj(object) {

    if (Object.keys(object).length === 0) return false;

    return true;

}

function isDefVar(variable) {
    if (variable) return true;
    return false;
}

exports.isDefObj = isDefObj;
exports.isDefVar = isDefVar;
