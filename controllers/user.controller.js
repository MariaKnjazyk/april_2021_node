const { PATH_USERS } = require('../config/variables');
const {
    getUsersFromFile,
    writeUsersInFile
} = require('../services/user.service');

module.exports = {
    createUser: async (req, res) => {
        const { mail, password } = req.body;

        const users = await getUsersFromFile(PATH_USERS);

        if (!mail || !password) {
            res.status(400).redirect('/error?info=fill_in_all_fields');

            return;
        }

        const isReg = users.some((user) => user.mail === mail);

        if (isReg) {
            res.status(400).redirect('/error?info=user_with_this_mail_already_exists');

            return;
        }

        const lastId = users[users.length - 1].id;
        const id = lastId + 1;

        users.push({ id, mail, password });
        await writeUsersInFile(PATH_USERS, users);

        res.status(201).redirect('/login');
    },

    getAllUsers: async (req, res) => {
        const users = await getUsersFromFile(PATH_USERS);
        res.json(users);
    },

    getSingleUser: async (req, res) => {
        const { userId } = req.params;

        const users = await getUsersFromFile(PATH_USERS);

        const currentUser = users.find((user) => user.id === +userId);

        if (!currentUser) {
            res.status(404).end('user not found');

            return;
        }

        res.json(currentUser);
    }
};
