
module.exports = {
    get_user: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.get_user()
        .then((user) => res.status(200).send(user))
        .catch(err => console.log(err, 'get user error'))
    },

    

}