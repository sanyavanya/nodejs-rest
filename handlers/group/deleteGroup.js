const deleteGroup = async function (req, res, groupModel) {
    try {
        await groupModel.destroy({ where: { id: req.group.id } });
        return res.status(202).send();
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: 'group not found' });
    }
};

module.exports = deleteGroup;
