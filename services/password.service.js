const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const { errorMessage, statusCodes } = require('../config');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (hash, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.NOT_FOUND);
        }
    }
};