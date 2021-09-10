const router = require('express').Router();

const { authMiddleware, userMiddleware } = require('../middlewares');
const { adminController } = require('../controllers');
const {
    constants: { NEED_ITEM },
    destiny,
    paramName,
    userRolesEnum: { ADMIN, SUPER_ADMIN }
} = require('../config');

router.post(
    '/create',
    userMiddleware.validateDataDynamic(destiny.user.CREATE_BY_ADMIN),
    authMiddleware.validateToken(),
    userMiddleware.checkUserRoleAccess([
        ADMIN,
        SUPER_ADMIN
    ]),
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    userMiddleware.isUserPresent(!NEED_ITEM),
    adminController.createUser
);

module.exports = router;
