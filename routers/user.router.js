const router = require('express').Router();

const {
    dataIn,
    dbFiled,
    destiny,
    paramName
} = require('../config');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get(
    '/',
    userMiddleware.validateDataDynamic(destiny.user.UPDATE_OR_FIND_USER, dataIn.QUERY),
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.validateDataDynamic(destiny.user.CREATE_USER),
    userMiddleware.checkUniqueEmail,
    userController.createUser
);

router.use(
    '/:userId',
    userMiddleware.validateDataDynamic(destiny.user.USER_ID, dataIn.PARAMS)
);
router.delete(
    '/:userId',
    userMiddleware.isUserPresentByDynamicParam(paramName.user.ID, dataIn.PARAMS, dbFiled._ID),
    userController.deleteUser
);
router.get(
    '/:userId',
    userMiddleware.isUserPresentByDynamicParam(paramName.user.ID, dataIn.PARAMS, dbFiled._ID),
    userController.getUserById
);
router.put(
    '/:userId',
    userMiddleware.validateDataDynamic(destiny.user.UPDATE_OR_FIND_USER),
    userMiddleware.checkUniqueEmail,
    userMiddleware.isUserPresentByDynamicParam(paramName.user.ID, dataIn.PARAMS, dbFiled._ID),
    userController.updateUser
);

module.exports = router;
