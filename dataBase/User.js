const { Schema, model } = require('mongoose');

const { userRolesEnum } = require('../config');

const userSchema = new Schema({
    name: {
        trim: true,
        type: String,
        required: true
    },

    email: {
        trim: true,
        type: String,
        required: true,
        unique: true
    },

    password: {
        trim: true,
        type: String,
        required: true
    },

    role: {
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum),
        type: String
    }
}, { timestamps: true });

module.exports = model('user', userSchema);
