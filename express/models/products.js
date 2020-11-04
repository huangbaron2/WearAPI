const mongoose = require('mongoose')


const productsSchema = new mongoose.Schema({
    name: {type: String, default: undefined},
    brand: {type: Array, default: undefined},
    color: {type: String, default: undefined},
    article: {type: String, default: undefined},
    size: {type: String, default: undefined},
    description: {type: String, default: undefined},
    userID: {type: String, default: undefined},
    price: {type: String, default: undefined},
    condition: {type: String, default: undefined}
})


module.exports = mongoose.model('Products', productsSchema)