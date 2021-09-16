const cors = require('cors');
const express = require('express');
const expressFileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');

require('dotenv').config();

const {
    constants: { RATE_LIMIT },
    errorMessage,
    statusCodes,
    variables: { ALLOWED_ORIGIN, PORT, MONG_CONNECT }
} = require('./config');
const {
    adminRouter,
    authRouter,
    carRouter,
    userRouter
} = require('./routers');
const cronJobs = require('./cron');
const { ErrorHandler } = require('./errors');
const { superAdminUtil } = require('./utils');
const swaggerJson = require('./docs/swagger.json');

const app = express();

mongoose.connect(MONG_CONNECT);

app.use(cors({ origin: _configureCors }));
app.use(rateLimit({
    windowMs: RATE_LIMIT.WINDOW_MS,
    max: RATE_LIMIT.MAX
}));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

(async () => {
    try {
        await superAdminUtil.checkCreateSuperAdmin();
    } catch (e) {
        console.log(e);
    }
})();

app.listen(PORT, () => {
    console.log('App listen', PORT);
    cronJobs();
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || statusCodes.NOT_FOUND,
        message: err.message || errorMessage.NOT_FOUND
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res.status(err.status || statusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
}

function _configureCors(origin, callback) {
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!origin && process.env.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(statusCodes.FORBIDDEN, errorMessage.CORS_NOT_ALLOWED), false);
    }

    return callback(null, true);
}
