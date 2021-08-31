const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/',
    userMiddleware.validateDataDynamic('updateOrFindUser', 'query'),
    userController.getUsers);
router.post('/',
    userMiddleware.validateDataDynamic('createUser'),
    userMiddleware.checkUniqueEmail,
    userController.createUser);

router.delete('/:userId',
    userMiddleware.validateDataDynamic('userId', 'params'),
    userMiddleware.isUserPresentByDynamicParam('userId', 'params', '_id'),
    userController.deleteUser);
router.get('/:userId',
    userMiddleware.validateDataDynamic('userId', 'params'),
    userMiddleware.isUserPresentByDynamicParam('userId', 'params', '_id'),
    userController.getUserById);
router.put('/:userId',
    userMiddleware.validateDataDynamic('userId', 'params'),
    userMiddleware.validateDataDynamic('updateOrFindUser'),
    userMiddleware.checkUniqueEmail,
    userMiddleware.isUserPresentByDynamicParam('userId', 'params', '_id'),
    userController.updateUser);

module.exports = router;
