const UserGroup = require('../../models/UserGroup');
const Group = require('../../models/Group');

const addUsersToGroup = async function (req, res, next) {
    try {
        const groupWithThisId = await Group.findByPk(req.body.groupId);
        if (!groupWithThisId) {
            next({ code: 404, message: 'Group Not Found' });
        } else {
            await Promise.all(req.body.userIds.map(async userId => {
                await UserGroup.create({
                    userId,
                    groupId: req.body.groupId
                });
            }));
            res.status(201).send();
        }
    } catch (err) {
        next(err);
    }
};

module.exports = addUsersToGroup;
