const nodemailer = require('nodemailer')
const schedule = require('node-schedule');
const bcrypt = require('bcryptjs')


module.exports = {
    weekly_mail: (req, res) => {  
        const { first_name, email } = req.body
        console.log(req.body)
    schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, () => {
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'roadmap.squad@gmail.com',
        pass: 'Devteam43'
      },
    })
    const mailOptions = {
      from: `"Roadmap Team" <roadmap.squad@gmail.com>`,
      to: `${email}`,
      subject: `Weekly Schedule Reminder for ${first_name}`,
      text: ``,
       replyTo: `<roadmap.squad@gmail.com>`,
       html: 
       `<b>
       We just want to remind you to stick to your Roadmap!<br/>
       From The Roadmap Squad Team</b>`
    }
    console.log(mailOptions)
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('Message Sent: %s ', info.response)
      }
    })
})
  
    },
    signup: async(req, res) => {
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
        console.log(req.body)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'roadmap.squad@gmail.com',
          pass: 'Devteam43'
        },
      })
      const mailOptions = {
        from: `"Roadmap Team" <roadmap.squad@gmail.com>`,
        to: `${email}`,
        subject: `Welcome ${first_name}`,
        text: `Welcome`,
         replyTo: `<roadmap.squad@gmail.com>`,
         html: 
         `<b>Welcome and congratulations on graduating Dev Mountain! We hope you make use of this Roadmap and follow the recomendations provided.  <br/><br/>
         Here is a link to DevMountain's Roadmap: 'https://docs.google.com/document/d/1k_tdOgVly2CVO3RU3fQgO5Fy0EQol-yAhnJ1N0KRlok/edit?usp=sharing'<br/>
         You've got this!
         <br/><br/> From The Roadmap Squad Team</b>`
      }
      console.log(mailOptions)
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('Message Sent: %s ', info.response)
        }
      })
    
      },
      delete_account: (req, res) => {
        const dbInstance = req.app.get("db");
        dbInstance
        .delete_account(req.session.user.user_id)
        .then(() => res.sendStatus(200));

      
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'roadmap.squad@gmail.com',
              pass: 'Devteam43'
            },
          })
          const mailOptions = {
            from: `"Roadmap Team" <roadmap.squad@gmail.com>`,
            to: `${req.session.user.email}`,
            subject: `Goodbye ${req.session.user.first_name}`,
            text: `Body `,
    
             replyTo: `<roadmap.squad@gmail.com>`,
             html: 
             `<b>We are sorry to see you go, but wish you the best!
             <br/> From The Roadmap Squad Team</b>`
          }
          console.log(mailOptions)
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.error('there was an error: ', err);
            } else {
              console.log('Message Sent: %s ', info.response)
            }
          })
    
      },

}
