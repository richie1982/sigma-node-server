const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    ticker: {
        type: String
    },
    name: {
        type: String
    }
})

const userSchema = new mongoose.Schema({

    firstName: {
        type: String
    },
    surName: {
        type: String
    } ,
    email: {
        type: String
    },
    products: [
        productSchema
    ]
})

module.exports = mongoose.model('User', userSchema)