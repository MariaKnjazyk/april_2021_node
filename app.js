const express = require('express');

const { PORT } = require('./config/variables');
const {
    authRouter,
    errorRouter,
    userRouter
} = require('./routers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/error', errorRouter);
app.use('/users', userRouter);

app.get('/login', (req, res) => {
    res.json('login');
});

app.get('/register', (req, res) => {
    res.json('register');
});

app.listen(PORT, () => {
    console.log('App listen', PORT);
});
