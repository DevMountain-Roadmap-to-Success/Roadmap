
module.exports = {
    get_user: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.get_user()
        .then((user) => res.status(200).send(user))
        .catch(err => console.log(err, 'get user error'))
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
        console.log('session destroyed')

    },
    
    get_tasks: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.get_tasks(5)
        .then((data) => res.status(200).send(data))
    },
    create_task: (req, res) => {
        const dbInstance = req.app.get('db')
        const {task } = req.body

        dbInstance.create_task(5, task, false)
        .then((data) => res.status(200).send(data))
        .catch(err => console.log(err, 'create task error'))
    },
    delete_task: (req, res) => {
      const dbInstance = req.app.get('db')

      dbInstance.delete_task(req.params.id, 5)
      .then((data) => res.status(200).send(data))
    }

}