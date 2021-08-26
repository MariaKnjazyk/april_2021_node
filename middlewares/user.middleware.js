const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const { errorMessage } = require('../config');

module.exports = {
    isFillInAllFields: (req, res, next) => {
        try {
            const { email, name, password } = req.body;

            if (!email || !name || !password) {
                throw new ErrorHandler(400, errorMessage.FILL_FIELDS);
            }

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
                throw new ErrorHandler(404, errorMessage.NOT_FOUND);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkDataToModify: (req, res, next) => {
        try {
            const { email, name, password } = req.body;

            if (!email && !name && !password) {
                throw new ErrorHandler(400, errorMessage.NO_DATA);
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
                throw new ErrorHandler(409, errorMessage.EXIST_EMAIL);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};