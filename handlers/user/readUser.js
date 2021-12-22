const readUser = function (req, res, next) {
    try {
        if (req.user) {
            res.status(200).json(req.user);
            next();
        }
        next({ code: 404, message: 'User Not Found' });
    } catch (err) {
        next(err);
    }
};

module.exports = readUser;
