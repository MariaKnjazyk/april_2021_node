const Joi = require('joi');

const { constants: { CURRENT_YEAR, ID_REGEXP, START_YEAR }, orderByEnum } = require('../config');

const carId = Joi.object({
    carId: Joi.string().trim().regex(ID_REGEXP)
});

const createCar = Joi.object({
    model: Joi.string().trim().required().min(2)
        .max(30),
    year: Joi.number().required().min(START_YEAR).max(CURRENT_YEAR)
});

const updateCar = Joi.object({
    model: Joi.string().trim().min(2)
        .max(30),
    year: Joi.number().min(START_YEAR).max(CURRENT_YEAR)
});

const findCar = Joi.object({
    model: Joi.string().trim().min(2)
        .max(30),
    year: Joi.number().min(START_YEAR).max(CURRENT_YEAR),
    year_from: Joi.number().min(START_YEAR).max(CURRENT_YEAR),
    year_to: Joi.number().min(START_YEAR).max(CURRENT_YEAR),
    page: Joi.number().integer().min(1),
    perPage: Joi.number().integer().min(1),
    order: Joi.string().valid(...Object.values(orderByEnum)),
    sortBy: Joi.string()
});

module.exports = {
    createCar,
    carId,
    findCar,
    updateCar
};
