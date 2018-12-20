
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

        dbInstance.get_tasks(req.params.id)
        .then((data) => res.status(200).send(data))
    }

}