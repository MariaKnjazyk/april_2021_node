const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { constants: { CRON_UNIT }, emailActionsEnum } = require('../config');
const { emailService } = require('../services');
const { OAuth, User } = require('../dataBase');

module.exports = async () => {
    const activePeriod = dayjs.utc().subtract(10, CRON_UNIT.DAYS);

    const activeTokenUsers = await OAuth.find({ createdAt: { $gte: activePeriod } });

    const activeUsersId = [];
    activeTokenUsers.forEach((item) => activeUsersId.push(item.user._id));

    const users = await User.find({ _id: { $nin: activeUsersId } });

    await Promise.all(users.map(async (user) => {
        const isActive = activeTokenUsers.some((actUser) => user._id.toString === actUser._id.toString());

        if (!isActive) {
            await emailService.sendMail(
                user.email,
                emailActionsEnum.NOT_ACTIVE,
                { userName: user.name }
            );
        }
    }));
};
