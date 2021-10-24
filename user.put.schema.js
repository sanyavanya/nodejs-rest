const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.string().required(),
    login: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]*$/),
    age: Joi.number().min(4).max(130)
});
