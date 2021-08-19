const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const {PORT} = require('./config/variables');
const users1 = require('./db/users');

const users = JSON.parse(JSON.stringify(users1));

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
    const {name, password} = req.body;
    for (const user of users) {
        if (user.name === name && user.password === password) {
            res.status(200).redirect('/users');
        }
    }
    res.status(404).render('login', {info: 'wrong name or password'});
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const {name, age, password} = req.body;
    if (!name || !age || !password) {
        res.status(400).render('register', {info: 'fill in all fields'});
        return;
    }
    if (age < 0) {
        res.status(400).render('register', {info: 'wrong age'});
        return;
    }
    for (const user of users) {
        if (user.name === name) {
            res.status(400).render('register', {info: 'user with this name already exists'});
            return;
        }
    }
    users.push({name, age, password});
    fs.writeFile(path.join(__dirname, 'db', 'users.js'), `module.exports = ${JSON.stringify(users)}`, err => {
        console.log(err);
    });
    res.status(201).render('register_success');
});


app.get('/users', (req, res) => {
    res.render('users', {users});
});

app.get('/users/:userName', (req, res) => {
    const {userName} = req.params;
    const currentUser = users.find(user => user.name === userName);
    if (!currentUser) {
        res.status(404).end('user not found');
        return;
    }
    res.json(currentUser);
});


app.listen(PORT, () => {
    console.log('App listen', PORT);
});

