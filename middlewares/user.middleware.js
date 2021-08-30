const ErrorHandler = require('../errors/ErrorHandler');
const { errorMessage, statusCodes } = require('../config');
const { User } = require('../dataBase');
const { userValidator } = require('../validators');

module.exports = {
    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const emailToLowercase = email.toLowerCase();

            const userByEmail = await User.findOne({ email: emailToLowercase });

            if (userByEmail) {
                throw new ErrorHandler(statusCodes.CONFLICT, errorMessage.EXIST_EMAIL);
            }

            req.body.email = emailToLowercase;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataToCreate: (req, res, next) => {
        try {
            const { error } = userValidator.createUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataToUpdate: (req, res, next) => {
        try {
            const { error } = userValidator.updateOrFindUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataToFind: (req, res, next) => {
        try {
            const { error } = userValidator.updateOrFindUser.validate(req.query);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserId: (req, res, next) => {
        try {
            const { error } = userValidator.userId.validate(req.params);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
