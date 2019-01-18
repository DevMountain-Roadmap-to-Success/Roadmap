require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const bodyParser = require('body-parser')
const ctrl = require('./controller')
const bcrypt = require('bcryptjs')
const {CONNECTION_STRING, SERVER_PORT} = process.env
const nodemailer = require('./nodemailer')

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

 

  app.get('/auth/session', (req, res, next) => {
    if(req.session.user){
      res.status(200).send(req.session.user)
    } else {
      res.status(401).send('no user')
    }
  })
  

app.post('/auth/login', async (req, res, next) => {
  const dbInstance = req.app.get('db')
  const { email, password } = req.body
  // console.log(email, password)

    let user = await dbInstance.check_user(email)        
    console.log(user);
    if(!user[0]){
      res.status(403).send('no user found')
    } else {
      let match = await bcrypt.compareSync(password, user[0].password);
    if (!match) {
      res.status(403).send('wrong password')
    } else if(match) {
      req.session.user = user[0]
      console.log(req.session.user)
      res.status(200).send(req.session.user)
     }
    }
})
  app.post('/auth/signup', nodemailer.signup)
  app.post('/sendEmail', nodemailer.weekly_mail)
  app.get('/api/logout', ctrl.logout) 
  app.delete('/api/account', nodemailer.delete_account)

  //todolist
  app.get('/api/tasks', ctrl.get_tasks)
  app.post('/api/addtask', ctrl.create_task)
  app.put('/api/tasks/complete/:id', ctrl.complete_task)
  app.put('/api/tasks/update/:id', ctrl.update_task)
  app.delete('/api/tasks/delete/:id', ctrl.delete_task)

  // calendar
  app.get('/api/activity', ctrl.get_activities)
  app.post('/api/activity', ctrl.calendar_activities)
  app.post('/api/makeActivity', ctrl.make_activity)
  app.put('/api/editActivity/:id', ctrl.edit_activity)
  app.delete('/api/deleteActivity/:id', ctrl.delete_activity)

  app.get('/api/trivia', ctrl.get_trivia)






const Port = SERVER_PORT || 4000


app.listen(Port, () => {console.log(`Server is listening on ${SERVER_PORT}`)})
