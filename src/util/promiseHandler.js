module.exports = promise => {
    return promise.then(data => [null, data]).catch(error => [error]);
}