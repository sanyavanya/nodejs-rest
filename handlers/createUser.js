const uuid = require('uuid');

const createUser = function (req, res, db) {
    for (const user of db.users) {
        if (user.login === req.body.login) {
            return res.status(400).json({ error: 'username taken' });
        }
    }
    db.users.push({
        id: uuid.v4(),
        ...req.body,
        isDeleted: false
    });
    res.status(201).send();
};

module.exports = createUser;
