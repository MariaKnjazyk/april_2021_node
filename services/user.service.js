const fs = require('fs');
const util = require('util');

const readFileFsPromisify = util.promisify(fs.readFile);
const writeFileFsPromisify = util.promisify(fs.writeFile);

module.exports = {
    getUsersFromFile: async (pathUsers) => {
        try {
            const usersData = await readFileFsPromisify(pathUsers);

            return JSON.parse(usersData.toString());
        } catch (e) {
            console.log(e);

            return [];
        }
    },

    writeUsersInFile: async (pathUsers, users) => {
        try {
            await writeFileFsPromisify(pathUsers, JSON.stringify(users));
        } catch (e) {
            console.log(e);
        }
    }
};
