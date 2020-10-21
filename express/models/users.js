const mongoose = require('mongoose')


const usersSchema = new mongoose.Schema({
    email: {type: String, default: undefined},
    password: {type: String, default: undefined},
    mode: {type: String, default: undefined}
})


module.exports = mongoose.model('users', usersSchema)