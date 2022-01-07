const Joi = require("joi");

module.exports = Joi.object().keys({
  groupId: Joi.string().required(),
  userIds: Joi.array().items(Joi.string().required()),
});
