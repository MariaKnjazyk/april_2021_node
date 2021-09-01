const { dataIn: { BODY }, errorMessage, statusCodes } = require('../config');
const { ErrorHandler } = require('../errors');
const { passwordService } = require('../services');
const { User } = require('../dataBase');

module.exports = {
    checkPassword: async (req, res, next) => {
        try {
            const { user } = req;
            const { password } = req.body;

            await passwordService.compare(user.password, password);

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresentByDynamicParam: (paramName, dataIn = BODY, dbFiled = paramName) => async (req, res, next) => {
        try {
            let data = req[dataIn][paramName];

            if (paramName === 'email') data = data.toLowerCase();

            const user = await User.findOne({ [dbFiled]: data });

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.WRONG_LOG_OR_PASS);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
