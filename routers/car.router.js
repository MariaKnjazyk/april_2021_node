const router = require('express').Router();

const {
    dataIn,
    dbFiled,
    destiny,
    paramName
} = require('../config');
const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get(
    '/',
    carMiddleware.validateDataDynamic(destiny.car.FIND_CAR, dataIn.QUERY),
    carController.getCars
);
router.post(
    '/',
    carMiddleware.validateDataDynamic(destiny.car.CREATE_CAR),
    carController.createCar
);

router.use(
    '/:carId',
    carMiddleware.validateDataDynamic(destiny.car.CAR_ID, dataIn.PARAMS)
);
router.delete(
    '/:carId',
    carMiddleware.getCarByDynamicParam(paramName.car.ID, dataIn.PARAMS, dbFiled._ID),
    carMiddleware.isCarPresent,
    carController.deleteCar
);
router.get(
    '/:carId',
    carMiddleware.getCarByDynamicParam(paramName.car.ID, dataIn.PARAMS, dbFiled._ID),
    carMiddleware.isCarPresent,
    carController.getCarById
);
router.put(
    '/:carId',
    carMiddleware.validateDataDynamic(destiny.car.UPDATE_CAR),
    carMiddleware.getCarByDynamicParam(paramName.car.ID, dataIn.PARAMS, dbFiled._ID),
    carMiddleware.isCarPresent,
    carController.updateCar
);

module.exports = router;
