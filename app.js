const express = require('express');
const mongoose = require('mongoose');

const { variables: { PORT, MONG_CONNECT }, errorMessage } = require('./config');
const {
    carRouter,
    userRouter
} = require('./routers');

const app = express();

mongoose.connect(MONG_CONNECT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || 404,
        message: err.message || errorMessage.NOT_FOUND
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res.status(err.status || 500).json({ message: err.message });
}
