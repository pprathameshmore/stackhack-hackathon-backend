const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const bcrypt = require('bcrypt');

const emailValidator = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: emailValidator,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.methods.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10).catch(error => console.error(error));
}

UserSchema.plugin(timestamp);

module.exports = mongoose.model('User', UserSchema);