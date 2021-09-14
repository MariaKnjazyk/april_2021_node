const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { constants: { CRON_UNIT }, emailActionsEnum } = require('../config');
const { emailService } = require('../services');
const { OAuth, User } = require('../dataBase');

module.exports = async () => {
    const activePeriod = dayjs.utc().subtract(10, CRON_UNIT.DAYS);

    const activeUsers = await OAuth.find({ createdAt: { $gte: activePeriod } });

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
