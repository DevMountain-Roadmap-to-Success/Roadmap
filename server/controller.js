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
  delete_account: (req, res) => {
    const dbInstance = req.app.get('db')

    dbInstance.delete_account(req.session.user.user_id)
    .then(() => res.sendStatus(200))
  },

  get_tasks: (req, res) => {
    const dbInstance = req.app.get("db");

    dbInstance
      .get_tasks(req.session.user.user_id)
      .then(data => res.status(200).send(data));
  },
  create_task: (req, res) => {
    const dbInstance = req.app.get("db");
    const { date_created, task } = req.body;

    dbInstance
      .create_task(req.session.user.user_id, task, false, date_created)
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
    const { description, complete_by } = req.body;
    let complete = false;

    dbInstance
      .update_task(
        req.params.id,
        complete,
        complete_by,
        description,
        req.session.user.user_id
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
  make_activity: (req, res) => {
    const db = req.app.get("db");
    const { date, time, input, priority } = req.body;
    db.make_activity(req.session.user.user_id, date, time, input, priority).then(
      activity => res.status(200).send(activity)
    );
  },
  edit_activity: (req, res) => {
    const db = req.app.get("db");
    const { activity, priority } = req.body;
    db.edit_activity(req.params.id, activity, priority).then(
      activity => res.status(200).send(activity)
    );
  },
  delete_activity: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.delete_activity(id).then(activity =>
      res.status(200).send(activity)
    );
  }
  
  //CALENDAR
};
