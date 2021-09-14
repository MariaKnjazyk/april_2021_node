const {
    emailActionsEnum:
    {
        AUTH,
        CREATE_ADMIN,
        DELETED_BY_ADMIN,
        DELETED_BY_USER,
        FORGOT_PASSWORD,
        NOT_ACTIVE,
        UPDATE,
        WELCOME
    }
} = require('../config');

module.exports = {
    [AUTH]: {
        templateName: 'auth',
        subject: 'Logged in'
    },
    [CREATE_ADMIN]: {
        templateName: CREATE_ADMIN,
        subject: 'Create account'
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
    [NOT_ACTIVE]: {
        templateName: 'notActive.pug',
        subject: 'Have you forgotten us?'
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
