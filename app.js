// const os = require('os');
// console.log("joy: ", os.totalmem() / 1024 / 1024);
// console.log("bo'sh joy: ", os.freemem() / 1024 / 1024);
// const path = require('path');
require("dotenv").config()
const PORT = process.env.PORT

const express = require('express');
const path = require('path');
const mor = require('morgan');
const { title } = require("process");
const { log } = require("console");

const createViewPath = (page) =>{
    return path.join(__dirname, "views", `${page}.ejs`);
}

const app = express();
app.set("wiew engine","ejs")
app.use(mor("tiny"))


app.get('/', (req, res) => {
  res.render(createViewPath("index"),{title:"Main"});
})

app.get('/users', (req, res) => {
    const users =[
      {name:"John", age:20},
      {name:"Alice", age:30},
      {name:"Bob", age:25}
    ]
    users.forEach(user =>{
        console.log(user);
    });
  res.render(createViewPath("users"),{title:"user",users});
})

app.get('/contact', (req, res) => {
  res.render(createViewPath("contact"),{title:"contact"});
})

app.get('/gallery', (req, res) => {
  res.render(createViewPath("gallery"),{title:"gallery"});
})

app.get('/jobs', (req, res) => {
  res.render(createViewPath("jobs"),{title:"jobs"});
})

app.listen(PORT, () => {
  console.log(`\nServer running at http://localhost:${PORT}`)
})


app.use((req, res) => {
    res.render(createViewPath("error"),{title:"xatolik"})
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
