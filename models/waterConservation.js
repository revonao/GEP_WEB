const mongoose = require('mongoose')

const waterConservationSchema = new mongoose.Schema({
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

module.exports = mongoose.model('waterConservation', waterConservationSchema)