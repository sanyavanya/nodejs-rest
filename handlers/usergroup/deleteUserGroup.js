const deleteUserGroup = async function (userGroupModel, deletedRecord) {
    if (deletedRecord.userId) {
        userGroupModel.destroy({ where: { userId: deletedRecord.userId } })
            .catch(err => {
                console.log(err);
            });
    }
    if (deletedRecord.groupId) {
        userGroupModel.destroy({ where: { groupId: deletedRecord.groupId } })
            .catch(err => {
                console.log(err);
            });
    }
};

module.exports = deleteUserGroup;
