const updateUser = function (req, res, db) {
    const userToUpdate = req.body;
    for (let i = 0; i < db.users.length; i++) {
        if (db.users[i].id === userToUpdate.id) {
            db.users[i] = userToUpdate;
            console.log(db);
            return res.status(204).send();
        }
    }
    console.log(db);
    res.status(404).json({ error: 'user not found' });
};

module.exports = updateUser;
