const { passwordService } = require('../services');

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
    }
};
