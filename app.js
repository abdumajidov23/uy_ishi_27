require("dotenv").config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');

const PORT = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(morgan('tiny'));

// Foydalanuvchi shablon yo'lini yaratish
const createViewPath = (page) => path.join(__dirname, 'views', `${page}.ejs`);

app.get('/', (req, res) => {
    res.render(createViewPath('index'), { title: 'Main' });
});

app.get('/users', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;
        res.render(createViewPath('users'), { title: 'Users', users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Serverda xatolik yuz berdi');
    }
});

app.get('/contact', (req, res) => {
    res.render(createViewPath('contact'), { title: 'Contact' });
});

app.get('/gallery', (req, res) => {
    res.render(createViewPath('gallery'), { title: 'Gallery' });
});

app.get('/jobs', (req, res) => {
    res.render(createViewPath('jobs'), { title: 'Jobs' });
});

app.listen(PORT, () => {
    console.log(`\nServer running at http://localhost:${PORT}`);
});

app.use((req, res) => {
    res.render(createViewPath('error'), { title: 'Xatolik' });
});
