const Joi = require('joi');

const { constants: { CURRENT_YEAR, ID_REGEXP, START_YEAR } } = require('../config');

const carId = Joi.object({
    userId: Joi.string().trim().regex(ID_REGEXP)
});

const createCar = Joi.object({
    model: Joi.string().trim().required().min(2)
        .max(30),
    year: Joi.number().required().min(START_YEAR).max(CURRENT_YEAR)
});

const updateOrFindCar = Joi.object({
    model: Joi.string().trim().min(2)
        .max(30),
    year: Joi.number().min(START_YEAR).max(CURRENT_YEAR)
});

module.exports = {
    createCar,
    carId,
    updateOrFindCar
};
