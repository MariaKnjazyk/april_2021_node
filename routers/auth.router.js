const router = require('express').Router();

const { authController } = require('../controllers');
const {
    actionEnum: { ACTIVATE_ACCOUNT, FORGOT_PASSWORD },
    constants: {
        AUTH,
        NEED_ITEM,
        TOKEN_TYPE_REFRESH
    },
    destiny,
    paramName
} = require('../config');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post(
    '/',
    userMiddleware.validateDataDynamic(destiny.user.AUTH_USER),
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    userMiddleware.isUserPresent(NEED_ITEM, AUTH),
    authMiddleware.isAccountActivated,
    authController.loginUser
);

router.get(
    '/activate',
    authMiddleware.getToken,
    authMiddleware.validateActionToken(ACTIVATE_ACCOUNT),
    authController.accountActivation
);

router.post(
    '/logout',
    authMiddleware.validateToken(),
    authController.logoutUser
);

router.post(
    '/logout_all_devices',
    authMiddleware.validateToken(),
    authController.logoutUserAllDevices
);

router.post(
    '/password/forgot',
    userMiddleware.validateDataDynamic(destiny.user.CHANGE_PASSWORD_FORGOT_USER),
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    userMiddleware.isUserPresent(),
    authController.sendMailChangePassword
);

router.put(
    '/password/forgot',
    userMiddleware.validateDataDynamic(destiny.user.CHANGE_PASSWORD_FORGOT),
    authMiddleware.validateActionToken(FORGOT_PASSWORD),
    authController.changePassword
);

router.put(
    '/password/reset',
    userMiddleware.validateDataDynamic(destiny.user.CHANGE_PASSWORD_RESET),
    authMiddleware.validateToken(),
    authMiddleware.checkOldPassword,
    authController.changePassword
);

router.post(
    '/refresh',
    authMiddleware.validateToken(TOKEN_TYPE_REFRESH),
    authController.refresh
);

module.exports = router;
