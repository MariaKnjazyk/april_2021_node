const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const {PORT} = require('./config/variables');
const usersFromFile = require('./db/users');

const users = JSON.parse(JSON.stringify(usersFromFile));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));


app.get('/ping', (req, res) => {
    res.json('Pong');
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const {mail, password} = req.body;

    for (const user of users) {
        if (user.mail === mail && user.password === password) {
            res.status(200).redirect(`/users/${user.id}`);
        }
    }

    res.status(404).render('login_unsuccessful');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const {mail, password} = req.body;

    if (!mail || !password) {
        res.status(400).render('register', {info: 'fill in all fields'});
        return;
    }

    for (const user of users) {
        if (user.mail === mail) {
            res.status(400).render('register', {info: 'user with this mail already exists'});
            return;
        }
    }

    const lastId = users[users.length - 1].id;
    const id = lastId + 1;
    users.push({id, mail, password});
    fs.writeFile(path.join(__dirname, 'db', 'users.js'), `module.exports = ${JSON.stringify(users)}`, err => {
        console.log(err);
    });

    res.status(201).render('register_success');
});


app.get('/users', (req, res) => {
    res.render('users', {users});
});

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const currentUser = users.find(user => +user.id === +userId);

    if (!currentUser) {
        res.status(404).end('user not found');
        return;
    }

    res.render('user', {currentUser});
});


app.listen(PORT, () => {
    console.log('App listen', PORT);
});

