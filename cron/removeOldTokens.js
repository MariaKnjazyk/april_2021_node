const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { constants: { CRON_UNIT } } = require('../config');
const { OAuth, ActToken } = require('../dataBase');

module.exports = async () => {
    const previousMonth = dayjs.utc().subtract(1, CRON_UNIT.MONTH);

    await OAuth.deleteMany({ createdAt: { $lte: previousMonth } });

    await ActToken.deleteMany({ createdAt: { $lte: previousMonth } });
};
