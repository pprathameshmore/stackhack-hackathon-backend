const Todo = require('../models/todo');


/* Generate response */
function response(statusCode, message, data) {
    return {
        statusCode: statusCode,
        message: message,
        data: data
    };
}

/* Generate response */
function responsePaging(statusCode, message, data, paging) {
    return {
        statusCode: statusCode,
        paging: paging,
        message: message,
        data: data
    };
}

/* Validate */
function isDefObj(object) {

    if (Object.keys(object).length === 0) return false;

    return true;

}

function isDefVar(variable) {
    if (variable) return true;
    return false;
}

exports.response = response;
exports.responsePaging = responsePaging;
exports.isDefObj = isDefObj;
exports.isDefVar = isDefVar;
