const router = require('express').Router();

const { authController } = require('../controllers');
const {
    constants: { AUTH, NEED_ITEM },
    destiny,
    paramName
} = require('../config');
const { userMiddleware } = require('../middlewares');

router.post(
    '/',
    userMiddleware.validateDataDynamic(destiny.user.AUTH_USER),
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    userMiddleware.isUserPresent(NEED_ITEM, AUTH),
    authController.loginUser
);

module.exports = router;
