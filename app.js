const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const db = mysql.createConnection({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
});

const dbInit = () => {
    if (!fs.existsSync('.db_init')) {
        console.log('.db_init not found, initializing db...');

        const createVT = `
            CREATE TABLE page_views (
                page VARCHAR(255) PRIMARY KEY,
                views INT DEFAULT 0
            )`;

        db.query(createVT, (error) => {
            if (error) throw error;
            console.log('Views table created successfully.');
            insertPages();
            fs.writeFileSync('.db_init', 'complete');
        });

        db.query(`SHOW TABLES LIKE 'page_views'`, (err, results) => {
            if (err) throw err;

            if (results.length === 0) {
                const createVT = `
                    CREATE TABLE page_views (
                        page VARCHAR(255) PRIMARY KEY,
                        views INT DEFAULT 0
                    )`;

                db.query(createVT, (error) => {
                    if (error) throw error;
                    console.log('Views table created successfully.');
                    insertPages();
                    fs.writeFileSync('.db_init', 'complete');
                });
            } else {
                console.log('Views table already exists, skipping.');
                insertPages();
            }
        });
    } else {
        console.log('.db_init file found, skipping database initialization.');
    }
};

const insertPages = () => {
    const pages = ['/', '/about', '/contact', '/verify', '/status', '/design', '/projects'];
    pages.forEach(page => {
        const sql = `INSERT IGNORE INTO page_views (page, views) VALUES (?, 0)`;
        db.query(sql, [page], (error) => {
            if (error) throw error;
        });
    });
};

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database.');
    dbInit();
});

app.post('/api/log-view', (req, res) => {
    const { page } = req.body;
    const sql = `UPDATE page_views SET views = views + 1 WHERE page = ?`;
    db.query(sql, [page], (error) => {
        if (error) return res.status(500).json({ error });

        const selectSql = `SELECT views FROM page_views WHERE page = ?`;
        db.query(selectSql, [page], (error, results) => {
            if (error) return res.status(500).json({ error });
            res.json({ views: results[0].views });
        });
    });
});

const routes = ['/', '/about', '/contact', '/verify', '/status', '/design', '/projects'];
routes.forEach(route => {
    app.get(route, (req, res) => {
        res.render(route === '/' ? 'index' : route.slice(1), { req });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    const now = new Date();
    const fT = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    console.log(`Running at: ${fT}`);
    console.log(`Server running on http://localhost:${PORT}`);
});
