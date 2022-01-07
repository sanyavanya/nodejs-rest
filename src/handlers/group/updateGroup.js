const Group = require("../../models/Group");

const updateGroup = async function (req, res, next) {
  const groupToUpdate = req.body;
  try {
    const groupWithThisId = await Group.findByPk(groupToUpdate.id);
    if (!groupWithThisId) {
      next({ code: 404, message: "Group Not Found" });
    } else {
      await groupWithThisId.update(req.body);
      return res.status(204).send();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = updateGroup;
