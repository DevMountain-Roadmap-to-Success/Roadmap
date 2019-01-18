const axios = require("axios");
const bcrypt = require('bcryptjs')
module.exports = {
  get_user: (req, res) => {
    const dbInstance = req.app.get("db");

    dbInstance
      .get_user(req.session.user.user_id)
      .then(user => res.status(200).send(user))
      .catch(err => console.log(err, "get user error"));
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
    console.log("session destroyed");
  },
  update_profile: (req, res) => {
    const dbInstance = req.app.get('db')
    var { image } = req.body

    dbInstance.update_profile(image, req.session.user.user_id)
    .then((data) => res.status(200).send(data))
  },
  update_info: (req, res) => {
    const db = req.app.get("db");
    const { full_name, image } = req.body;
    db.update_info(
      full_name,
      image,
      req.params.id,
      req.session.user.user_id
    ).then(data => {
      console.log(data)
      res.status(200).send(data);
    })
  },
  update_password:  async(req, res) => {
    const dbInstance = req.app.get('db')
    const {password} = req.body
    console.log(password)
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    dbInstance.update_password(hash, req.session.user.user_id )
    .then(data => {
    res.status(200).send(data)
    })
  },


  get_tasks: async (req, res) => {
    const dbInstance = req.app.get("db");

    let tasks = await dbInstance.get_tasks(req.session.user.user_id);

    res.status(200).send(tasks);
  },
  create_task: (req, res) => {
    const dbInstance = req.app.get("db");
    const { date_created, task, time } = req.body;
    const complete = false;
    dbInstance
      .create_task(req.session.user.user_id, task, complete, date_created, time)
      .then(data => res.status(200).send(data))
      .catch(err => console.log(err, "create task error"));
  },
  delete_task: async (req, res, next) => {
    const dbInstance = req.app.get("db");
    console.log(req.params.id);

    dbInstance
      .delete_task(req.params.id)
      .then(async () => {
        let data = await dbInstance.get_tasks(req.session.user.user_id);
        res.status(200).send(data);
      })
      .catch(err => console.log(err, "delete error"));
  },
  complete_task: (req, res) => {
    const dbInstance = req.app.get("db");
    const { complete } = req.body;
    console.log(complete);

    dbInstance
      .complete_task(complete, req.params.id, req.session.user.user_id)
      .then(tasks => {
        console.log(tasks);
        res.status(200).send(tasks);
      });
  },
  update_task: (req, res) => {
    const dbInstance = req.app.get("db");
    const { input, newDate, newTime, priority, description } = req.body;
    let complete = false;

    dbInstance
      .update_task(
        req.params.id,
        complete,
        input,
        newDate,
        priority,
        newTime,
        description
      )
      .then(data => res.status(200).send(data));
  },

  //CALENDAR

  calendar_activities: (req, res) => {
    const db = req.app.get("db");
    const { date, time } = req.body;

    db.calendar_activities(date, time, req.session.user.user_id).then(
      activities => res.status(200).send(activities)
    );
  },
  get_activities: (req, res) => {
    const db = req.app.get("db");
    db.get_activities(req.session.user.user_id).then(data =>
      res.status(200).send(data)
    );
  },
  make_activity: (req, res) => {
    const db = req.app.get("db");
    const { newDate, newTime, input, priority, description } = req.body;
    const complete = false;
    console.log(req.body);
    db.make_activity(
      req.session.user.user_id,
      newDate,
      newTime,
      input,
      complete,
      description,
      priority
    ).then(activity => res.status(200).send(activity));
  },
  edit_activity: (req, res) => {
    const db = req.app.get("db");
    const { activity, priority } = req.body;
    db.edit_activity(req.params.id, activity, priority).then(activity => {
      res.status(200).send(activity);
    });
  },
  delete_activity: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.delete_activity(id).then(activity => {
      res.status(200).send(activity);
    });
  },

  //CALENDAR

  async get_trivia(req, res) {
    let t = await axios.get("http://jservice.io/api/random");
    res.status(200).send(t.data);
  }
};
