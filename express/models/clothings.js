const mongoose = require('mongoose')


const clothesSchema = new mongoose.Schema({
    brand: {type: Array, default: undefined},
    model: {type: Array, default: undefined},
    color: {type: Array, default: undefined},
    article: {type: Array, default: undefined},
    image: {type: String}
})


module.exports = mongoose.model('Clothings', clothesSchema)