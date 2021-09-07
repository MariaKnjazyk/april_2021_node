const { model, Schema } = require('mongoose');

const { actionEnum, databaseTableEnum: { ACT_TOKEN, USER } } = require('../config');

const actTokenSchema = new Schema({
    action_token: {
        type: String,
        required: true
    },
    [USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    },
    action: {
        enum: Object.values(actionEnum),
        required: true,
        type: String
    }
}, { timestamps: true });

module.exports = model(ACT_TOKEN, actTokenSchema);
