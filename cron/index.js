const cron = require('node-cron');

const removeOldTokens = require('./removeOldTokens');
const sendMails = require('./sendMails');

module.exports = () => {
    cron.schedule('59 23 * * 1', () => {
        console.log(`Cron start at ${new Date().toISOString()}`);
        removeOldTokens();
        console.log(`Cron finished at ${new Date().toISOString()}`);
    });

    cron.schedule('*/3 * * * * *', async () => {
        console.log(`Cron mail start at ${new Date().toISOString()}`);
        await sendMails();
        console.log(`Cron mail finished at ${new Date().toISOString()}`);
    });
};
