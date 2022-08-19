const mongoose = require('mongoose')

const calcSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true
    },
    type_en: {
        type: String,
        required: true
    },
    type_cn: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Calc', calcSchema)