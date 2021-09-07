const { model, Schema } = require('mongoose');

const { databaseTableEnum: { INACTIVE_ACCOUNT, USER } } = require('../config');

const inactiveAccountSchema = new Schema({
    action_token: {
        type: String,
        required: true
    },
    [USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(INACTIVE_ACCOUNT, inactiveAccountSchema);
