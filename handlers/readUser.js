const readUser = function (req, res, db) {
    if (req.user) {
        return res.status(200).json(req.user);
    }
    res.status(404).json({ error: 'user not found' });
};

module.exports = readUser;
