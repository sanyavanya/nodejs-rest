const User = require("../../models/User");

const updateUser = async function (req, res, next) {
  const userToUpdate = req.body;
  try {
    const userWithThisId = await User.findByPk(userToUpdate.id);
    if (!userWithThisId) {
      next({ code: 404, message: "User Not Found" });
    }
    await userWithThisId.update(req.body);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = updateUser;
