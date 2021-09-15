const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { constants: { CRON_UNIT }, emailActionsEnum } = require('../config');
const { emailService } = require('../services');
const { OAuth } = require('../dataBase');

module.exports = async () => {
    const activePeriod = dayjs.utc().subtract(10, CRON_UNIT.DAYS);

    const notActiveTokenUsers = await OAuth.find({ createdAt: { $lte: activePeriod } });

    await Promise.all(notActiveTokenUsers.map(async ({ user }) => {
        await emailService.sendMail(
            user.email,
            emailActionsEnum.NOT_ACTIVE,
            { userName: user.name }
        );
    }));
};
