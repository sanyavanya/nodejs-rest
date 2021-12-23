const readUser = function (req, res, next) {
    try {
        if (req.user && !req.user.dataValues.isDeleted) {
            const { id, login, age } = req.user.dataValues;
            const userData = { id, login, age };
            res.status(200).json(userData);
            next();
        }
        next({ code: 404, message: 'User Not Found' });
    } catch (err) {
        next(err);
    }
};

module.exports = readUser;
