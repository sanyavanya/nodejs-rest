const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().alphanum().min(3).max(30).required(),
    permissions: Joi.array().items(Joi.string())
});
