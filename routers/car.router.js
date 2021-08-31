const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get('/',
    carMiddleware.validateDataDynamic('updateOrFindCar', 'query'),
    carController.getCars);
router.post('/',
    carMiddleware.validateDataDynamic('createCar'),
    carController.createCar);

router.delete('/:carId',
    carMiddleware.validateDataDynamic('carId', 'params'),
    carMiddleware.isCarPresentByDynamicParam('carId', 'params', '_id'),
    carController.deleteCar);
router.get('/:carId',
    carMiddleware.validateDataDynamic('carId', 'params'),
    carMiddleware.isCarPresentByDynamicParam('carId', 'params', '_id'),
    carController.getCarById);
router.put('/:carId',
    carMiddleware.validateDataDynamic('carId', 'params'),
    carMiddleware.validateDataDynamic('updateOrFindCar'),
    carMiddleware.isCarPresentByDynamicParam('carId', 'params', '_id'),
    carController.updateCar);

module.exports = router;
