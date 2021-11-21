const deleteUserGroup = async function (userGroupModel, deletedRecord) {
    console.log(deletedRecord);
    if (deletedRecord.userId) {
        userGroupModel.destroy({ where: { userid: deletedRecord.userId } })
            .catch(err => {
                console.log(err);
            });
    }
    if (deletedRecord.groupId) {
        userGroupModel.destroy({ where: { groupid: deletedRecord.groupId } })
            .catch(err => {
                console.log(err);
            });
    }
};

module.exports = deleteUserGroup;
