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
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

OAuthSchema.pre('findOne', function() {
    this.populate(USER);
});
OAuthSchema.pre('find', function() {
    this.populate(USER);
});

module.exports = model(OAuth, OAuthSchema);
