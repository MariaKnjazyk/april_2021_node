module.exports = {
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Secret',
    ACTIVATE_ACCOUNT_SECRET_KEY: process.env.ACTIVATE_ACCOUNT_SECRET_KEY || 'Word',
    FORGOT_PASSWORD_SECRET_KEY: process.env.FORGOT_PASSWORD_SECRET_KEY || 'SuperWord',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'SuperSecret',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

    AWS_S3_NAME: process.env.AWS_S3_NAME || 'owu-mkn-bucket',
    AWS_S3_REGION: process.env.AWS_S3_REGION || 'owu-user',
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || '',
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY || '',

    EMAIL_SUPER_ADMIN: process.env.EMAIL_SUPER_ADMIN || 'mashaknjazyk@gmail.com',
    NAME_SUPER_ADMIN: process.env.NAME_SUPER_ADMIN || 'SuperAdmin',
    TEMP_PASS: process.env.TEMP_PASS || 'Pa$',

    FRONTEND_URL: process.env.FRONTEND_URL || 'https://stackoverflow.com',
    FRONTEND_URL_PASSWORD: process.env.FRONTEND_URL_PASSWORD || 'https://mcd.com.ua',
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'test@example.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '1235',

    MONG_CONNECT: process.env.MONG_CONNECT || 'mongodb://localhost:27017/apr-2021',
    PORT: process.env.PORT || 5000,
    URL_ACTIVATE: process.env.URL_ACTIVATE || 'http://localhost:5000/auth/activate'
};
