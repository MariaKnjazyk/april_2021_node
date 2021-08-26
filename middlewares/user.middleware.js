const { dataService } = require('../services');
const ErrorHandler = require('../errors/ErrorHandler');
const { errorMessage, statusCodes } = require('../config');
const { User } = require('../dataBase');

module.exports = {
    checkDataToModify: (req, res, next) => {
        try {
            const { email, name, password } = req.body;

            if (!email && !name && !password) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.NO_DATA);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(statusCodes.CONFLICT, errorMessage.EXIST_EMAIL);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isFillInAllFields: (req, res, next) => {
        try {
            const { email, name, password } = req.body;

            if (!email || !name || !password) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.FILL_FIELDS);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await dataService.findItemById(User, userId);

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }

};
