module.exports = {
    find_friends: (req, res, next) => {
        const dbInstance = req.app.get('db')
        console.log(req.session)

        dbInstance.find_friends(req.session.user.cohort, req.session.user.user_id)
        .then((data) => res.status(200).send(data))
        .catch(err => console.log(err, 'find friends error'))
    },
    sorted_friends: (req, res, next ) => {
        const dbInstance = req.app.get('db')

        dbInstance.sorted_friends(req.session.user.user_id)
        .then((data) => res.status(200).send(data))
        .catch(err => console.log(err, 'sort error'))
    },
    my_friends: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.my_friends(req.session.user.user_id)
        .then((data) => res.status(200).send(data))
    },
    add_friend: (req, res) => {
        const db = req.app.get('db')
        const {friend_id } = req.params.id

        db.add_friend(req.session.user.user_id, friend_id)
        .then((data) => res.status(200).send(data))
    },
    all_students: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.all_students()
        .then((data) => res.status(200).send(data))
    },
    delete_friend: (req, res) => {
        const db = req.app.get('db')
        const {friend_id } = req.params.id

        db.delete_friend(req.session.user.user_id, friend_id)
        .then((data) => res.status(200).send(data))
    }
}