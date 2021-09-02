const jwt = require('jsonwebtoken');

const {
    constants: { TOKEN_TYPE_ACCESS },
    errorMessage,
    statusCodes,
    variables: { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY }
} = require('../config');
const ErrorHandler = require('../errors/ErrorHandler');
const { promicify: { verifyPromise } } = require('../utils');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType) => {
        try {
            const secret = tokenType === TOKEN_TYPE_ACCESS ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await verifyPromise(token, secret);
        } catch (e) {
            throw new ErrorHandler(statusCodes.NOT_VALID_TOKEN, errorMessage.NOT_VALID_TOKEN);
        }
    }
};
