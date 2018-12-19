require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const bodyParser = require('body-parser')
const {CONNECTION_STRING, SERVER_PORT} = process.env


massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('database connected')
  }).catch(err => console.log(err, 'connection error'))
  
  const user = {
    "firstname":"kim",
    "lastname":"guyton",
    "email":"kim@mail.com",
    "password":"kim"
  }
  
  app.use(bodyParser.json())
  
  
  app.use(session({
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: false
  }))

app.post('/auth/login', (req, res) => {
  
})
  
  
app.get('/api/user', (req, res) => {
  res.status(200).send(user)
})




const Port = SERVER_PORT || 4000


app.listen(Port, () => {console.log(`Server is listening on ${SERVER_PORT}`)})
