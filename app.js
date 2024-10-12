const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { req: req });
});

app.get('/about', (req, res) => {
    res.render('about', { req: req });
});

app.get('/contact', (req, res) => {
    res.render('contact', { req: req });
});

app.get('/verify', (req, res) => {
    res.render('verify', { req: req });
});

app.get('/status', (req, res) => {
    res.render('status', { req: req });
});

app.get('/design', (req, res) => {
    res.render('design', { req: req });
});

app.get('/projects', (req, res) => {
    res.render('projects', { req: req });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});