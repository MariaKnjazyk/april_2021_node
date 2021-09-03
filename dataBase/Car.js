const { model, Schema } = require('mongoose');

const { databaseTableEnum: { CAR } } = require('../config');

const carSchema = new Schema({
    model: {
        trim: true,
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = model(CAR, carSchema);
