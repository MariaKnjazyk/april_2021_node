const { Car } = require('../dataBase');
const { dataService } = require('../services');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            const createdCar = await dataService.createItem(Car, req.body);

            res.status(201).json(createdCar);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await dataService.deleteItem(Car, carId);

            res.json(`Car with id ${carId} is deleted`);
        } catch (e) {
            next(e);
        }
    },

    getCars: async (req, res, next) => {
        try {
            const cars = await dataService.getItems(Car, req.query);

            res.json(cars);
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

            const carUpdate = await dataService.updateItem(Car, carId, req.body);

            res.json(carUpdate);
        } catch (e) {
            next(e);
        }
    }

};
