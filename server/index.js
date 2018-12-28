require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const bodyParser = require('body-parser')
const ctrl = require('./controller')
const bcrypt = require('bcryptjs')
const {CONNECTION_STRING, SERVER_PORT} = process.env


massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('database connected')
  }).catch(err => console.log(err, 'connection error'))
  

  app.use(bodyParser.json())
  
  
  app.use(session({
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: false
  }))



  app.get('/auth/session', (req, res) => {
    if(req.session.user){
      res.status(200).send(req.session.user)
    } else {
      res.status(401).send('no user')
    }
  })
  app.post('/auth/signup', async (req, res) => {
    const dbInstance = req.app.get('db')
    const { first_name, last_name, email, password } = req.body
    console.log(first_name, last_name, email, password)

    let user = await dbInstance.check_user(email)
    if (user[0]) {
      return res.status(401).send('Email already in use')
    } else {
      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(password, salt)
      let newUser = await dbInstance.create_user(first_name, last_name, email, hash )
  
      req.session.user = newUser[0]
      console.log(req.session)
      res.status(200).send(req.session.user)
     }
}) 
  app.post('/auth/login', async (req, res) => {
    const dbInstance = req.app.get('db')
    const { email, password } = req.body
    console.log(email, password)
  
    let user = await dbInstance.check_user(email)
    if(user){
    let result = await bcrypt.compareSync(password, user[0].password);
    console.log(result)
    if (result) {
      req.session.user = user[0]
        console.log(req.session.user)
        res.status(200).send(req.session.user)
      }
    } else {
      res.status(401).send('user not found')
    } 
 }) 
  app.get('/api/logout', ctrl.logout) 
  app.get('/api/tasks', ctrl.get_tasks)
  app.post('/api/addtask', ctrl.create_task)
  app.put('/api/tasks/update/:id', ctrl.complete_task)
  app.delete('/api/tasks/delete/:id', ctrl.delete_task)






const Port = SERVER_PORT || 4000


app.listen(Port, () => {console.log(`Server is listening on ${SERVER_PORT}`)})
