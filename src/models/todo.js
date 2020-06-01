const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const TodoSchema = new mongoose.Schema({
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
        enum: [1, 2, 3],
        default: 3
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

TodoSchema.index({ task: 'text' });

TodoSchema.plugin(timestamp);

module.exports = mongoose.model('Todo', TodoSchema);