const readGroup = function (req, res) {
    if (req.group) {
        return res.status(200).json(req.group);
    }
    res.status(404).json({ error: 'group not found' });
};

module.exports = readGroup;
