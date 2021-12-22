const readGroup = function (req, res, next) {
    try {
        if (req.group) {
            res.status(200).json(req.group);
            next();
        }
        next({ code: 404, message: 'Group Not Found' });
    } catch (error) {
        next(error);
    }
};

module.exports = readGroup;
