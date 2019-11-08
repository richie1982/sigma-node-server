const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    ticker: {
        type: String
    },
    name: {
        type: String
    }
})

