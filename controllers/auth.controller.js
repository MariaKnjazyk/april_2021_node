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

    logoutUserAllDevices: async (req, res, next) => {
        try {
            const { loginUser } = req;

            await OAuth.deleteMany({ user: loginUser._id });

            res.json('OK');
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { loginUser } = req;
            const refresh_token = req.get(AUTHORIZATION);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.findOneAndUpdate({ refresh_token }, tokenPair);

            res.json({ ...tokenPair, user: userUtil.userNormalizator(loginUser) });
        } catch (e) {
            next(e);
        }
    }
};
