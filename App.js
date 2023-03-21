const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const { Database } = require('./database.js');

const app = express();
const port = 3000;
const db = new Database("users");

app.set('views', './views'); // specify the views directory
app.set('view engine', 'ejs'); // register the template engine

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const data = db.getUser(id)
    console.log(data)
    res.render('user', { data });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const data = req.body
    console.log(data)
    const id = db.autonum
    const result = db.setUser(id, data);
    console.log(id)
    console.log(result)
    res.redirect("/verification");
});

app.get('/verification', (req, res) => {
    res.render('verification');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', (req, res) => {
    const data = req.body
    console.log(data)
    const result = db.checkUser(data.email, data.password);
    console.log(result.state)
    if (result.state) {
        res.redirect("/dashboard/" + result.id);
    } else {
        res.redirect("/login");
    }
})

app.get('/dashboard/:id', (req, res) => {
    const id = req.params.id;
    const data = db.getUser(id)
    console.log(data)
    console.log(id)
    res.render('dashboard', {data});
})

app.get('/users', (req, res) => {
    const data = db.fetchEverything();
    res.render('users', { data });
})



app.listen(port, () => console.log(`json-bread listening on port ${port}!`));