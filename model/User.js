const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({

    ticker: {
        type: String
    },
    name: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
})

const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
    },
    firstName: {
        type: String
    },
    surName: {
        type: String
    } ,
    email: {
        type: String
    },
    password: {
        type: String
    },
    products: [
        { type: Schema.Types.ObjectId, ref: 'Product' }
    ]
})

module.exports.User = mongoose.model('User', userSchema)
module.exports.Product = mongoose.model('Product', productSchema)