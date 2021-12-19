const addUsersToGroup = async function (req, res, userModel, groupModel, userGroupModel) {
    try {
        await Promise.all(req.body.userIds.map(async userId => {
            await userGroupModel.create({
                userId: userId,
                groupId: req.body.groupId,
            });
        }))
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(500).send('an error occured');
    }
};

module.exports = addUsersToGroup;
