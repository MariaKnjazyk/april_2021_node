const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get(
    '/',
    carMiddleware.validateDataDynamic('updateOrFindCar', 'query'),
    carController.getCars
);
router.post(
    '/',
    carMiddleware.validateDataDynamic('createCar'),
    carController.createCar
);

router.use(
    '/:carId',
    carMiddleware.validateDataDynamic('carId', 'params')
);
router.delete(
    '/:carId',
    carMiddleware.isCarPresentByDynamicParam('carId', 'params', '_id'),
    carController.deleteCar
);
router.get(
    '/:carId',
    carMiddleware.isCarPresentByDynamicParam('carId', 'params', '_id'),
    carController.getCarById
);
router.put(
    '/:carId',
    carMiddleware.validateDataDynamic('updateOrFindCar'),
    carMiddleware.isCarPresentByDynamicParam('carId', 'params', '_id'),
    carController.updateCar
);

module.exports = router;
