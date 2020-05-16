const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const Todo = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    label: {
        type: String,
        enum: ['PERSONAL', 'WORK', 'SHOPPING', 'OTHER'],
        default: 'PERSONAL'
    },
    progress: {
        type: String,
        enum: ['NEW', 'IN_PROGRESS', 'COMPLETED'],
        default: 'NEW'
    },
    isImportant: {
        type: Boolean,
        default: false
    },
    priority: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        default: 5
    }

});

Todo.plugin(timestamp);

module.exports = mongoose.model('Todo', Todo);