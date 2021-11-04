const errorResponse = require('./errorResponse');

function validateSchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false
        });
        if (error && error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    };
}

module.exports = validateSchema;
