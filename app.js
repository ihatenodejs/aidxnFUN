const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const routes = ['/', '/about', '/contact', '/verify', '/status', '/design', '/projects', '/cloud'];
routes.forEach(route => {
    app.get(route, (req, res) => {
        res.render(route === '/' ? 'index' : route.slice(1), { req });
    });
});

const PORT = process.env.PORT || 5566;
app.listen(PORT, () => {
    const now = new Date();
    const fT = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    console.log(`Running at: ${fT}`);
    console.log(`Server running on http://localhost:${PORT}`);
});
