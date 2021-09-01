const {
    constants: { AUTH, NEED_ITEM },
    dataIn: { BODY },
    errorMessage,
    statusCodes
} = require('../config');
const { ErrorHandler } = require('../errors');
const { User } = require('../dataBase');
const { userValidator } = require('../validators');

module.exports = {
    checkUserAccess: (rolesArr = []) => (req, res, next) => {
        try {
            const { loginUser, user } = req;

             if (loginUser._id === user._id) return next();

            if (!rolesArr.length) return next();

            if (!rolesArr.includes(loginUser.role)) {
                throw new ErrorHandler(statusCodes.FORBIDDEN, errorMessage.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, dataIn = BODY, dbFiled = paramName) => async (req, res, next) => {
        try {
            let data = req[dataIn][paramName];

            if (!data) return next();

            if (paramName === 'email') data = data.toLowerCase();

            const user = await User.findOne({ [dbFiled]: data });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: (isUserNeed = NEED_ITEM, auth = !AUTH) => (req, res, next) => {
        try {
            const { user } = req;

            if (!user && isUserNeed) {
                if (!auth) throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);

                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.WRONG_PASSW_OR_EMAIL);
            }

            if (user && !isUserNeed) {
                throw new ErrorHandler(statusCodes.CONFLICT, errorMessage.EXIST_EMAIL);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataDynamic: (destiny, dataIn = BODY) => (req, res, next) => {
        try {
            const { error } = userValidator[destiny].validate(req[dataIn]);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
