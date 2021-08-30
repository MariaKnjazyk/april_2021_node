const { Car } = require('../dataBase');
const { carValidator } = require('../validators');
const { errorMessage, statusCodes } = require('../config');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { carId } = req.params;
            const car = await Car.findById(carId);

            if (!car) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarId: (req, res, next) => {
        try {
            const { error } = carValidator.carId.validate(req.params);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataToCreate: (req, res, next) => {
        try {
            const { error } = carValidator.createCar.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataToFind: (req, res, next) => {
        try {
            const { error } = carValidator.updateOrFindCar.validate(req.query);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataToUpdate: (req, res, next) => {
        try {
            const { error } = carValidator.updateOrFindCar.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
