const { model, Schema } = require('mongoose');

const { databaseTableEnum: { CHANGE_PASS, USER } } = require('../config');

const changePassSchema = new Schema({
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

module.exports = model(CHANGE_PASS, changePassSchema);
