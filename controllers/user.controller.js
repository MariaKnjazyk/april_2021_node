const { User } = require('../dataBase');
const { dataService } = require('../services');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const createdUser = await dataService.createItem(User, req.body);

            res.status(201).json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await dataService.deleteItem(User, userId);

            res.status(204).json(`User with id ${userId} is deleted`);
        } catch (e) {
            next(e);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await dataService.getItems(User, req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const userUpdate = await dataService.updateItem(User, userId, req.body);

            res.json(userUpdate);
        } catch (e) {
            next(e);
        }
    }

};
