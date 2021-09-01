const router = require('express').Router();

const { authController } = require('../controllers');
const {
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
    authController.loginUser
);

router.post(
    '/logout',
    authMiddleware.validateToken(),
    authController.logoutUser
);

router.post(
    '/refresh',
    authMiddleware.validateToken(TOKEN_TYPE_REFRESH),
    authController.refresh
);

module.exports = router;
