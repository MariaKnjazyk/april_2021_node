const {
    actionEnum: { ACTIVATE_ACCOUNT, FORGOT_PASSWORD },
    constants: { AUTHORIZATION, DONE, QUERY_ACTION_TOKEN },
    databaseTableEnum: { USER },
    dbFiled: { _ID },
    emailActionsEnum,
    statusCodes,
    variables: { FRONTEND_URL_PASSWORD }
} = require('../config');
const {
    emailService,
    jwtService,
    passwordService
} = require('../services');
const {
    ActToken,
    OAuth,
    User
} = require('../dataBase');
const { userUtil } = require('../utils');

module.exports = {
    accountActivation: async (req, res, next) => {
        try {
            const { loginUser } = req;

            await ActToken.deleteOne({ [USER]: loginUser[_ID], action: ACTIVATE_ACCOUNT });

            res.json(DONE);
        } catch (e) {
            next(e);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const { loginUser, body: { password } } = req;

            await ActToken.deleteOne({ [USER]: loginUser[_ID], action: FORGOT_PASSWORD });

            const hashedPassword = await passwordService.hash(password);

            const changedUser = await User.findByIdAndUpdate(loginUser[_ID], { password: hashedPassword });

            await OAuth.deleteMany({ [USER]: changedUser[_ID] });

            res.status(statusCodes.CREATED).json(DONE);
        } catch (e) {
            next(e);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(user.password, password);

            const userToReturn = userUtil.userNormalizator(user);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            await emailService.sendMail(
                userToReturn.email,
                emailActionsEnum.AUTH,
                { userName: userToReturn.name }
            );

            res.status(statusCodes.CREATED).json({ ...tokenPair, user: userToReturn });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await OAuth.deleteOne({ access_token });

            res.sendStatus(statusCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    logoutUserAllDevices: async (req, res, next) => {
        try {
            const { loginUser } = req;

            await OAuth.deleteMany({ user: loginUser._id });

            res.sendStatus(statusCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { loginUser } = req;
            const refresh_token = req.get(AUTHORIZATION);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.updateOne({ refresh_token }, tokenPair);

            res.status(statusCodes.CREATED).json({ ...tokenPair, user: userUtil.userNormalizator(loginUser) });
        } catch (e) {
            next(e);
        }
    },

    sendMailChangePassword: async (req, res, next) => {
        try {
            const { user } = req;

            const userToReturn = userUtil.userNormalizator(user);

            const action_token = await jwtService.generateActionToken(FORGOT_PASSWORD);

            await ActToken.create({ action_token, [USER]: userToReturn[_ID], action: FORGOT_PASSWORD });

            await emailService.sendMail(
                userToReturn.email,
                emailActionsEnum.FORGOT_PASSWORD,
                { userName: userToReturn.name, activeTokenURL: FRONTEND_URL_PASSWORD + QUERY_ACTION_TOKEN + action_token }
            );

            res.status(statusCodes.CREATED).json(DONE);
        } catch (e) {
            next(e);
        }
    }
};
