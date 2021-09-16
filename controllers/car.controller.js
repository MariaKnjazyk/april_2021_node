const { Car } = require('../dataBase');
const { carService } = require('../services');
const { statusCodes } = require('../config');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            const createdCar = await Car.create(req.body);

            res.status(statusCodes.CREATED).json(createdCar);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await Car.deleteOne({ _id: carId });

            res.sendStatus(statusCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    getCars: async (req, res, next) => {
        try {
            const response = await carService.getAll(req.query);

            res.json(response);
        } catch (e) {
            next(e);
        }
    },

    getCarById: (req, res, next) => {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const carUpdate = await Car.findByIdAndUpdate(carId, req.body);

            res.status(statusCodes.CREATED).json(carUpdate);
        } catch (e) {
            next(e);
        }
    }

};
