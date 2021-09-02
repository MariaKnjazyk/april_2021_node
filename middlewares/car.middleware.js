const { Car } = require('../dataBase');
const { carValidator } = require('../validators');
const { dataIn: { BODY }, errorMessage, statusCodes } = require('../config');
const { ErrorHandler } = require('../errors');

module.exports = {
    getCarByDynamicParam: (paramName, dataIn = BODY, dbFiled = paramName) => async (req, res, next) => {
        try {
            const data = req[dataIn][paramName];

            const car = await Car.findOne({ [dbFiled]: data });

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarPresent: (req, res, next) => {
        try {
            const { car } = req;

            if (!car) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataDynamic: (destiny, dataIn = BODY) => (req, res, next) => {
        try {
            const { error } = carValidator[destiny].validate(req[dataIn]);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
