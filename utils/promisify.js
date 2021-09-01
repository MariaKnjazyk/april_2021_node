const jwt = require('jsonwebtoken');
const util = require('util');

module.exports = {
    verifyPromise: util.promisify(jwt.verify)
};
