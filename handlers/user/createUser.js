const uuid = require('uuid');
const User = require('../../models/User');

const createUser = async function (req, res, next) {
    try {
        const userWithThisLogin = await User.findOne({
            where: {
                login: req.body.login
            }
        });
        if (userWithThisLogin) {
            next({ code: 400, message: 'Username Taken' });
        } else {
            await User.create({
                id: uuid.v4(),
                ...req.body,
                isDeleted: false
            });
            res.status(201).send();
        }
    } catch (err) {
        next(err);
    }
};

module.exports = createUser;
