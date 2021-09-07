const Joi = require('joi');

const { constants: { EMAIL_REGEXP, ID_REGEXP, PASSWORD_REGEXP }, userRolesEnum } = require('../config');

const authUser = Joi.object({
    email: Joi.string().trim().regex(EMAIL_REGEXP).required(),
    password: Joi.string().trim().regex(PASSWORD_REGEXP).required(),
});

const changePasswordForgot = Joi.object({
    password: Joi.string().trim().regex(PASSWORD_REGEXP).required()
});

const changePasswordForgotUser = Joi.object({
    email: Joi.string().trim().regex(EMAIL_REGEXP).required(),
});

const changePasswordReset = Joi.object({
    oldPassword: Joi.string().trim().regex(PASSWORD_REGEXP).required(),
    password: Joi.string().trim().regex(PASSWORD_REGEXP).required()
});

const createUser = Joi.object({
    email: Joi.string().trim().regex(EMAIL_REGEXP).required(),
    name: Joi.string().alphanum().trim().required()
        .min(2)
        .max(30),
    password: Joi.string().trim().regex(PASSWORD_REGEXP).required(),
    role: Joi.string().valid(...Object.values(userRolesEnum))
});

const updateOrFindUser = Joi.object({
    email: Joi.string().trim().regex(EMAIL_REGEXP),
    name: Joi.string().trim().alphanum()
        .min(2)
        .max(30),
    role: Joi.string().valid(...Object.values(userRolesEnum))
});

const userId = Joi.object({
    userId: Joi.string().trim().regex(ID_REGEXP)
});

module.exports = {
    authUser,
    changePasswordForgot,
    changePasswordForgotUser,
    changePasswordReset,
    createUser,
    updateOrFindUser,
    userId
};
