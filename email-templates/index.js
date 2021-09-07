const {
    emailActionsEnum:
    {
        AUTH,
        DELETED_BY_ADMIN,
        DELETED_BY_USER,
        FORGOT_PASSWORD,
        UPDATE,
        WELCOME
    }
} = require('../config');

module.exports = {
    [AUTH]: {
        templateName: 'auth',
        subject: 'Logged in'
    },
    [DELETED_BY_ADMIN]: {
        templateName: 'deletedByAdmin',
        subject: 'Deleted account'
    },
    [DELETED_BY_USER]: {
        templateName: 'deletedByUser',
        subject: 'Deleted account'
    },
    [FORGOT_PASSWORD]: {
        templateName: 'forgotPassword',
        subject: 'Are you forgot your password?'
    },
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome'
    },
    [UPDATE]: {
        templateName: 'update',
        subject: 'Account updated'
    }
};
