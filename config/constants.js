module.exports = {
    AMAZONAWS: 'amazonaws.com/',
    AUTH: true,
    AUTHORIZATION: 'Authorization',
    CURRENT_YEAR: new Date().getFullYear(),
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
    SALT: 10,
    SERVICE: 'gmail',
    START_YEAR: 1950,
    SYSTEM: 'system',
    TOKEN_TYPE_ACCESS: 'access_token',
    TOKEN_TYPE_REFRESH: 'refresh_token'
};
