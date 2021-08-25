const { getUsersFromFile } = require('../services/user.service');
const { PATH_USERS } = require('../config/variables');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const { mail, password } = req.body;

            const users = await getUsersFromFile(PATH_USERS);
            const logUser = users.find((user) => user.mail === mail && user.password === password);

            if (logUser) {
                res.redirect(`/users/${logUser.id}`);

                return;
            }

            res.status(404).redirect('/register');
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
};
