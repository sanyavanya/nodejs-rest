const uuid = require("uuid");
const Group = require("../../models/Group");

const createGroup = async function (req, res, next) {
  try {
    const groupWithThisName = await Group.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (groupWithThisName) {
      next({ code: 400, message: "Group Name Taken" });
    } else {
      await Group.create({
        id: uuid.v4(),
        ...req.body,
      });
      res.status(201).send();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = createGroup;
