const bcrypt = require('bcrypt');

const { ErrorHandler } = require('../errors');
const { constants: { SALT }, errorMessage, statusCodes } = require('../config');

module.exports = {
    hash: (password) => bcrypt.hash(password, SALT),
    compare: async (hash, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.WRONG_LOG_OR_PASS);
        }
    }
};
