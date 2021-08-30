const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get('/', carMiddleware.validateDataToFind, carController.getCars);
router.post('/', carMiddleware.validateDataToCreate, carController.createCar);

router.delete('/:carId', carMiddleware.validateCarId, carMiddleware.isCarPresent, carController.deleteCar);
router.get('/:carId', carMiddleware.validateCarId, carMiddleware.isCarPresent, carController.getCarById);
router.put('/:carId', carMiddleware.validateCarId, carMiddleware.validateDataToUpdate,
    carMiddleware.isCarPresent, carController.updateCar);

module.exports = router;
