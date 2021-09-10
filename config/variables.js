module.exports = {
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Secret',
    ACTIVATE_ACCOUNT_SECRET_KEY: process.env.ACTIVATE_ACCOUNT_SECRET_KEY || 'Word',
    EMAIL_SUPER_ADMIN: process.env.EMAIL_SUPER_ADMIN || 'mashaknjazyk@gmail.com',
    FORGOT_PASSWORD_SECRET_KEY: process.env.FORGOT_PASSWORD_SECRET_KEY || 'SuperWord',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://stackoverflow.com',
    FRONTEND_URL_PASSWORD: process.env.FRONTEND_URL_PASSWORD || 'https://mcd.com.ua',
    MONG_CONNECT: process.env.MONG_CONNECT || 'mongodb://localhost:27017/apr-2021',
    NAME_SUPER_ADMIN: process.env.NAME_SUPER_ADMIN || 'SuperAdmin',
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'test@example.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '1235',
    PORT: process.env.PORT || 5000,
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'SuperSecret',
    TEMP_PASS: process.env.TEMP_PASS || 'Pa$',
    URL_ACTIVATE: process.env.URL_ACTIVATE || 'http://localhost:5000/auth/activate'
};
