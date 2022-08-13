const mongoose = require('mongoose')

const calcSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Calc', calcSchema)