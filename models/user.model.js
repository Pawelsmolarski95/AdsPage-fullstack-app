const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    telephone: { type: String, required: false },
});

module.exports = mongoose.model('User', userSchema);