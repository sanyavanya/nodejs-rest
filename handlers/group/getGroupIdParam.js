const Group = require('../../models/Group');

const getGroupIdParam = async function (req, res, next, id) {
    try {
        req.group = await Group.findByPk(id);
    } catch (err) {
        next(err);
    }
    next();
};

module.exports = getGroupIdParam;
