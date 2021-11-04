const deleteUser = function (req, res, db) {
    if (req.user) {
        req.user.isDeleted = true;
        return res.status(202).send();
    }
    res.status(404).json({ error: 'user not found' });
};

module.exports = deleteUser;
