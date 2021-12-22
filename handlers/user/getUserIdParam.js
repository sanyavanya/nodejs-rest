const User = require('../../models/User');

const getUserIdParam = async function (req, res, next, id) {
    try {
        req.user = await User.findByPk(id);
    } catch (err) {
        next(err);
    }
    next();
};

module.exports = getUserIdParam;
