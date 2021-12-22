const User = require('../../models/User');
const deleteUserGroup = require('../usergroup/deleteUserGroup');

const deleteUser = async function (req, res, next) {
    try {
        if (req.user) {
            await User.update({ isDeleted: true }, { where: { id: req.user.id } });
            deleteUserGroup({ userId: req.user.id });
            return res.status(202).send();
        }
        next({ code: 404, message: 'User Not Found' });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteUser;
