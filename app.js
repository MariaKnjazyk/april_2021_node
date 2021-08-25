const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require('./config/variables');
const {
    authRouter,
    errorRouter,
    userRouter
} = require('./routers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pathStatic = path.join(__dirname, 'static');

app.use(express.static(pathStatic));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', pathStatic);

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
