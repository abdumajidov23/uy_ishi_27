require("dotenv").config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const tg_bot = process.env.tg_bot;
const tg_id = process.env.tg_id;

const app = express();
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));

const createViewPath = (page) => path.join(__dirname, 'views', `${page}.ejs`);

app.get('/', (req, res) => {
    res.render(createViewPath('index'), { title: 'Main', activePage: 'home' });
});

app.post('/send-message', async (req, res) => {
    const { name, email, message } = req.body;

    const text = `Yangi xabar:\n\nIsm: ${name}\nEmail: ${email}\nXabar: ${message}`;

    try {
        await axios.post(`https://api.telegram.org/bot${tg_bot}/sendMessage`, {
            chat_id: tg_id,
            text: text
        });
        res.send('Xabar muvaffaqiyatli yuborildi');
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Xabarni yuborishda xatolik yuz berdi');
    }
});

app.get('/users', async (req, res) => { 
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;
        res.render(createViewPath('users'), { title: 'Users', users, activePage: 'users' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Serverda xatolik yuz berdi');
    }
});

app.get('/contact', (req, res) => {
    const contactInfo = {
        phone: "123-456-7890",
        email: "contact@example.com",
        address: "123 Main St, Anytown, USA"
    };
    res.render(createViewPath('contact'), { title: 'Contact', contactInfo, activePage: 'contact' });
});

app.get('/gallery', (req, res) => {
    res.render(createViewPath('gallery'), { title: 'Gallery', activePage: 'gallery' });
});

app.get('/jobs', (req, res) => {
    const jobs = [
        { title: "Software Engineer", location: "San Francisco, CA", salary: "$120,000" },
        { title: "Data Scientist", location: "New York, NY", salary: "$110,000" },
        { title: "Product Manager", location: "Austin, TX", salary: "$100,000" }
    ];
    res.render(createViewPath('jobs'), { title: 'Jobs', jobs, activePage: 'jobs' });
});

app.listen(PORT, () => {
    console.log(`\nServer running at http://localhost:${PORT}`);
});

app.use((req, res) => {
    res.render(createViewPath('error'), { title: 'Xatolik', activePage: 'error' });
});
