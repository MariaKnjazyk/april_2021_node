module.exports = {
    AMAZONAWS: 'amazonaws.com/',
    AUTH: true,
    AUTHORIZATION: 'Authorization',
    CURRENT_YEAR: new Date().getFullYear(),
    CRON_DELETE_OLD_TOKEN: '59 23 1 * *',
    CRON_SEND_MAIL: '30 6 * * 1,3,5',
    CRON_UNIT: {
        DAYS: 'days',
        MONTH: 'month'
    },
    DONE: 'done',
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    ID_REGEXP: new RegExp('^[0-9a-fA-F]{24}$'),
    MIMETYPES: {
        PHOTO: [
            'image/jpeg',
            'image/png'
        ]
    },
    NEED_ITEM: true,
    NO_REPLY: 'no reply',
    QUERY_ACTION_TOKEN: '?action_token=',
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    PHOTO_MAX_SIZE: 5 * 1024 * 1024,
    RATE_LIMIT: {
        WINDOW_MS: 15 * 60 * 1000,
        MAX: 1000
    },
    SALT: 10,
    SERVICE: 'gmail',
    START_YEAR: 1950,
    SYSTEM: 'system',
    TOKEN_TYPE_ACCESS: 'access_token',
    TOKEN_TYPE_REFRESH: 'refresh_token'
};
