module.exports = {
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Secret',
    ACTION_SECRET_KEY: process.env.ACTION_SECRET_KEY || 'Word',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://stackoverflow.com',
    FRONTEND_URL_PASSWORD: process.env.FRONTEND_URL_PASSWORD || 'https://mcd.com.ua',
    MONG_CONNECT: process.env.MONG_CONNECT || 'mongodb://localhost:27017/apr-2021',
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'test@example.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '1235',
    PORT: process.env.PORT || 5000,
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'SuperSecret',
    URL_ACTIVATE: process.env.URL_ACTIVATE || 'http://localhost:5000/auth/activate'
};
