const {
    constants: { AUTHORIZATION, DONE, QUERY_ACTION_TOKEN },
    databaseTableEnum: { USER },
    dbFiled: { _ID },
    emailActionsEnum,
    statusCodes,
    variables: { FRONTEND_URL_PASSWORD }
} = require('../config');
const {
    emailService,
    jwtActionService,
    jwtService,
    passwordService
} = require('../services');
const {
    ChangePass,
    OAuth,
    User,
    InactiveAccount
} = require('../dataBase');
const { userUtil } = require('../utils');

module.exports = {
    accountActivation: async (req, res, next) => {
        try {
            const { loginUser } = req;

            await InactiveAccount.findOneAndDelete({ [USER]: loginUser[_ID] });

            res.json('ok');
        } catch (e) {
            next(e);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const { loginUser, body: { password } } = req;

            await ChangePass.findOneAndDelete({ [USER]: loginUser[_ID] });

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

            res.status(statusCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    logoutUserAllDevices: async (req, res, next) => {
        try {
            const { loginUser } = req;

            await OAuth.deleteMany({ user: loginUser._id });

            res.status(statusCodes.DELETED);
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

            res.status(statusCodes.CREATED).json({ ...tokenPair, user: userUtil.userNormalizator(loginUser) });
        } catch (e) {
            next(e);
        }
    },

    sendMailChangePassword: async (req, res, next) => {
        try {
            const { user } = req;

            const userToReturn = userUtil.userNormalizator(user);

            const action_token = await jwtActionService.generateActionToken();

            await ChangePass.create({ action_token, [USER]: userToReturn[_ID] });

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
