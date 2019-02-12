const nodemailer = require('nodemailer')
const schedule = require('node-schedule');
const bcrypt = require('bcryptjs')


module.exports = {
  message: (req, res) => {
    const {friend_email, message} = req.body
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'roadmap.squad@gmail.com',
        pass: 'Devteam43'
      },
    })
    const mailOptions = {
      from: `${req.session.user.full_name} <${req.session.user.email}>`,
      to: `${friend_email}`,
      subject: `A message from ${req.session.user.full_name}  `,
      text: `Hi`,
       replyTo: `<${req.session.user.email}>`,
       html: 
       `<b>${message}</b>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        res.status(200).send(info.response)
      }
    })
  
    },
  
    weekly_mail: (req, res) => {  
        const { first_name, email } = req.body
    schedule.scheduleJob({hour: 10, minute: 8, dayOfWeek: 5}, () => {
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
    })
    let content = 'BEGIN:VCALENDAR\r\nPRODID:-//ACME/DesktopCalendar//EN\r\nMETHOD:REQUEST\r\n...';
    const mailOptions = {
      from: `"Roadmap Team" <roadmap.squad@gmail.com>`,
      to: `${email}`,
      subject: `Weekly Schedule Reminder for ${first_name}`,
      text: ``,
      icalEvent: {
        filename: 'invitation.ics',
        method: 'request',
        content: content
    },
       replyTo: `<roadmap.squad@gmail.com>`,
       html: 
       `<b>
       We just want to remind you to stick to your Roadmap!<br/>
       From The Roadmap Squad Team</b>`
    }
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
      const { email, password } = req.body    
      let user = await dbInstance.check_user(email)
      if (user[0]) {
        return res.status(403).send('*Email Already Registered')
      } else {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        let newUser = await dbInstance.create_user( email, hash )
    
        req.session.user = newUser[0]
        res.status(200).send(req.session.user)
      }
   
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
        subject: `Welcome `,
        text: `Welcome`,
         replyTo: `<roadmap.squad@gmail.com>`,
         html: 
         `<b>Welcome and congratulations on graduating Dev Mountain! We hope you make use of this Roadmap and follow the recomendations provided. You've got this! 
         <br/> From The Roadmap Squad Team<br/>
         https://docs.google.com/document/d/1k_tdOgVly2CVO3RU3fQgO5Fy0EQol-yAhnJ1N0KRlok/edit?usp=sharing</b>`
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
            subject: `Goodbye`,
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
