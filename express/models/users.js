const mongoose = require('mongoose')


const usersSchema = new mongoose.Schema({
    userName: {type: String, default: undefined},
    email: {type: String, default: undefined},
    password: {type: String, default: undefined},
    watchList: {type: Object, default: {}},
    cart: {type: Array, default: []},
    sold: {type: Object, default: {}},
    bought: {type: Object, default: {}},
    history: {type: Array, default: []},
    joined: {type: String, default: ""}
}, { minimize: false })


module.exports = mongoose.model('users', usersSchema)