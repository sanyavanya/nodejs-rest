const Group = require('../../models/Group');
const deleteUserGroup = require('../usergroup/deleteUserGroup');

const deleteGroup = async function (req, res, next) {
    try {
        if (req.group) {
            await Group.destroy({ where: { id: req.group.id } });
            deleteUserGroup({ groupId: req.group.id });
            return res.status(202).send();
        }
        next({ code: 404, message: 'Group Not Found' });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteGroup;
