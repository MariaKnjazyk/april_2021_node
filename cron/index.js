const cron = require('node-cron');

const { constants: { CRON_DELETE_OLD_TOKEN, CRON_SEND_MAIL } } = require('../config');
const removeOldTokens = require('./removeOldTokens');
const sendMails = require('./sendMails');

module.exports = () => {
    cron.schedule(CRON_DELETE_OLD_TOKEN, () => {
        console.log(`Cron start at ${new Date().toISOString()}`);
        removeOldTokens();
        console.log(`Cron finished at ${new Date().toISOString()}`);
    });

    cron.schedule(CRON_SEND_MAIL, async () => {
        console.log(`Cron mail start at ${new Date().toISOString()}`);
        await sendMails();
        console.log(`Cron mail finished at ${new Date().toISOString()}`);
    });
};
