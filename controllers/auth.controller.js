const { constants: { AUTHORIZATION } } = require('../config');
const { jwtService, passwordService } = require('../services');
const { OAuth } = require('../dataBase');
const { userUtil } = require('../utils');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(user.password, password);

            const userToReturn = userUtil.userNormalizator(user);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            res.json({ ...tokenPair, user: userToReturn });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await OAuth.deleteOne({ access_token });

            res.json('OK');
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);
            const user = req.loginUser;

            await OAuth.deleteOne({ refresh_token });

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            res.json({ ...tokenPair, user: userUtil.userNormalizator(user) });
        } catch (e) {
            next(e);
        }
    }
};
