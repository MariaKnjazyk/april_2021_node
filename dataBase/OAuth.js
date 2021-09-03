const { model, Schema } = require('mongoose');

const { databaseTableEnum: { OAuth, USER } } = require('../config');

const OAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    [USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(OAuth, OAuthSchema);
