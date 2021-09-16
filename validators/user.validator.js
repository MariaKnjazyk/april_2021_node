const Joi = require('joi');

const {
    constants: {
        CURRENT_YEAR,
        EMAIL_REGEXP,
        ID_REGEXP,
        PASSWORD_REGEXP
    },
    orderByEnum,
    userRolesEnum
} = require('../config');

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

const createByAdmin = Joi.object({
    born_year: Joi.number().integer().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),
    email: Joi.string().trim().regex(EMAIL_REGEXP).required(),
    name: Joi.string().alphanum().trim().required()
        .min(2)
        .max(30),
    role: Joi.string().valid(...Object.values(userRolesEnum))
});

const createUser = Joi.object({
    born_year: Joi.number().integer().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),
    email: Joi.string().trim().regex(EMAIL_REGEXP).required(),
    name: Joi.string().alphanum().trim().required()
        .min(2)
        .max(30),
    password: Joi.string().trim().regex(PASSWORD_REGEXP).required(),
    role: Joi.string().valid(...Object.values(userRolesEnum))
});

const update = Joi.object({
    born_year: Joi.number().integer().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),
    email: Joi.string().trim().regex(EMAIL_REGEXP),
    name: Joi.string().trim().alphanum()
        .min(2)
        .max(30),
    role: Joi.string().valid(...Object.values(userRolesEnum)),
});

const find = Joi.object({
    born_year_from: Joi.number().integer().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),
    born_year_to: Joi.number().integer().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),
    email: Joi.string().trim().regex(EMAIL_REGEXP),
    name: Joi.string().trim().alphanum()
        .min(2)
        .max(30),
    page: Joi.number().integer().min(1),
    perPage: Joi.number().integer().min(1),
    role: Joi.string().valid(...Object.values(userRolesEnum)),
    order: Joi.string().valid(...Object.values(orderByEnum)),
    sortBy: Joi.string()
});

const userId = Joi.object({
    userId: Joi.string().trim().regex(ID_REGEXP)
});

module.exports = {
    authUser,
    changePasswordForgot,
    changePasswordForgotUser,
    changePasswordReset,
    createByAdmin,
    createUser,
    find,
    update,
    userId
};
