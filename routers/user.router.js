const router = require('express').Router();

const {
    constants: { NEED_ITEM },
    dataIn,
    dbFiled,
    destiny,
    paramName,
    userRolesEnum: { ADMIN, SUPER_ADMIN, USER }
} = require('../config');
const { userController } = require('../controllers');
const { authMiddleware, fileMiddlewares, userMiddleware } = require('../middlewares');

router.get(
    '/',
    userMiddleware.validateDataDynamic(destiny.user.FIND_USER, dataIn.QUERY),
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.validateDataDynamic(destiny.user.CREATE_USER),
    fileMiddlewares.checkAvatar,
    userMiddleware.checkUserRoleForCreate([USER]),
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    userMiddleware.isUserPresent(!NEED_ITEM),
    userController.createUser
);

router.use(
    '/:userId',
    userMiddleware.validateDataDynamic(destiny.user.USER_ID, dataIn.PARAMS)
);
router.delete(
    '/:userId',
    authMiddleware.validateToken(),
    userMiddleware.getUserByDynamicParam(paramName.user.ID, dataIn.PARAMS, dbFiled._ID),
    userMiddleware.isUserPresent(),
    userMiddleware.checkUserRoleAccess([
        ADMIN,
        SUPER_ADMIN
    ]),
    userController.deleteUser
);
router.get(
    '/:userId',
    userMiddleware.getUserByDynamicParam(paramName.user.ID, dataIn.PARAMS, dbFiled._ID),
    userMiddleware.isUserPresent(),
    userController.getUserById
);
router.put(
    '/:userId',
    userMiddleware.validateDataDynamic(destiny.user.UPDATE_USER),
    fileMiddlewares.checkAvatar,
    authMiddleware.validateToken(),
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    userMiddleware.isUserPresent(!NEED_ITEM),
    userMiddleware.getUserByDynamicParam(paramName.user.ID, dataIn.PARAMS, dbFiled._ID),
    userMiddleware.isUserPresent(),
    userMiddleware.checkUserAccess,
    userController.updateUser
);

module.exports = router;
