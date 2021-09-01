const router = require('express').Router();

const {
    destiny,
    paramName
} = require('../config');
const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post('/',
    userMiddleware.validateDataDynamic(destiny.user.AUTH_USER),
    authMiddleware.isUserPresentByDynamicParam(paramName.user.EMAIL),
    authMiddleware.checkPassword,
    authController.loginUser);

module.exports = router;
