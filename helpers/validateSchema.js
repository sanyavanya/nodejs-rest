function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error && error.isJoi) {
      next({ code: 400, message: error.details[0].message });
    } else {
      next();
    }
  };
}

module.exports = validateSchema;
