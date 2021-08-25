const router = require('express').Router();

const {userController} = require('../controllers');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:userId', userController.getSingleUser);

module.exports = router;
