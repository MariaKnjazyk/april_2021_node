const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { emailActionsEnum } = require('../config');
const { emailService } = require('../services');
const { OAuth, User } = require('../dataBase');

module.exports = async () => {
    const period = dayjs.utc().subtract(10, 'days');

    const activeUsers = await OAuth.find({ createdAt: { $gte: period } });

    const users = await User.find();

    for await (const user of users) {
        const isActive = activeUsers.some((actUser) => user._id.toString === actUser._id.toString());

        if (!isActive) {
            await emailService.sendMail(
                user.email,
                emailActionsEnum.NOT_ACTIVE,
                { userName: user.name }
            );
        }
    }
};
