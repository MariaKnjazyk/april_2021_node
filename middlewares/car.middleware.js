const { Car } = require('../dataBase');
const { carValidator } = require('../validators');
const { ErrorHandler } = require('../errors');
const { errorMessage, statusCodes } = require('../config');

module.exports = {
    isCarPresentByDynamicParam: (paramName, dataIn = 'body', dbFiled = paramName) => async (req, res, next) => {
        try {
            const data = req[dataIn][paramName];

            const car = await Car.findOne({ [dbFiled]: data });

            if (!car) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataDynamic: (destiny, dataIn = 'body') => (req, res, next) => {
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
