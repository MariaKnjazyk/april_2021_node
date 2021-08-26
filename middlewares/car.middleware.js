const { Car } = require('../dataBase');
const { carYears, errorMessage } = require('../config');
const { dataService } = require('../services');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    checkDataToModify: (req, res, next) => {
        try {
            const { model, year } = req.body;

            if (!model && !year) {
                throw new ErrorHandler(400, errorMessage.NO_DATA);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarPresent: async (req, res, next) => {
        try {
            const { carId } = req.params;
            const car = await dataService.findItemById(Car, carId);

            if (!car) {
                throw new ErrorHandler(404, errorMessage.NOT_FOUND);
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    isFillInAllFields: (req, res, next) => {
        try {
            const { model, year } = req.body;

            if (!model || !year) {
                throw new ErrorHandler(400, errorMessage.FILL_FIELDS);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isYearReal: (req, res, next) => {
        try {
            const { year } = req.body;

            if (year < carYears.START_YEAR || year > carYears.CURRENT_YEAR) {
                throw new ErrorHandler(400, errorMessage.WRONG_YEAR);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
