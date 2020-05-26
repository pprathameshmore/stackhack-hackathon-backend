//Dependency Injection
const User = require('../../models/user');


const checkUser = async (email) => await User.findOne({ email: email });

const createUser = async (email, password) => {
    const user = new User({ email: email, password: password });
    await user.save();
}

exports.checkUser = checkUser;
exports.createUser = createUser;