const UserGroup = require("../../models/UserGroup");

const deleteUserGroup = async function (deletedRecord) {
  if (deletedRecord.userId) {
    UserGroup.destroy({ where: { userId: deletedRecord.userId } }).catch(
      (err) => {
        console.log(err);
      }
    );
  }
  if (deletedRecord.groupId) {
    UserGroup.destroy({ where: { groupId: deletedRecord.groupId } }).catch(
      (err) => {
        console.log(err);
      }
    );
  }
};

module.exports = deleteUserGroup;
