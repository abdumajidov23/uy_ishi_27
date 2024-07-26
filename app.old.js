// const os = require('os');
// console.log("joy: ", os.totalmem() / 1024 / 1024);
// console.log("bo'sh joy: ", os.freemem() / 1024 / 1024);
// const path = require('path');
require("dotenv").config()
const PORT = process.env.PORT

const express = require('express');
const path = require('path');
const mor = require('morgan');

const createViewPath = (page) =>{
    return path.join(__dirname, "views", `${page}.html`);
}

const app = express();
app.use(mor("tiny"))


app.get('/', (req, res) => {
  res.sendFile(createViewPath("index"));
})

app.get('/users', (req, res) => {
  res.sendFile(createViewPath("users"));
})

app.get('/contact', (req, res) => {
  res.sendFile(createViewPath("contact"));
})

app.get('/gallery', (req, res) => {
  res.sendFile(createViewPath("gallery"));
})

app.get('/jobs', (req, res) => {
  res.sendFile(createViewPath("jobs"));
})

app.listen(PORT, () => {
  console.log(`\nServer running at http://localhost:${PORT}`)
})


app.use((req, res) => {
    res.sendFile(createViewPath("error"))
})














// app.get('/', (req, res) => {
//   res.send('Hello, World!')
// })

// app.get('/about' , function (req, res) {
//     res.send('about')
// })

// app.get('/users?', function (req, res) {
//     res.send('users')
// })

// app.get('/ab?cd', (req, res) => {
//     res.send('ab?cd')
// })

// app.get('/ab+cd', (req, res) => {
//     res.send('ab+cd')
// })

// app.get('/admin/:adminId', (req, res) => {
//     // res.send(req.params)
//     res.send(req.params.adminId)
// })

// app.get('/admin/:adminId/staff/:staffId', (req, res) => {
//     // res.send(req.params)
//     res.send(req.params.staffId)
// })



// app.listen(PORT, () => {
//   console.log(`\nServer running at http://localhost:${PORT}`)
// })
