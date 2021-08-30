const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.post('/', userMiddleware.validateDataToAuth, userMiddleware.isUserPresentByEmail, userMiddleware.checkPassword,
    authController.loginUser);

module.exports = router;
