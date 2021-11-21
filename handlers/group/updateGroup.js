const updateGroup = async function (req, res, groupModel) {
    const groupToUpdate = req.body;
    try {
        const groupWithThisId = await groupModel.findByPk(groupToUpdate.id);
        if (!groupWithThisId) {
            return res.status(404).json({ error: 'group not found' });
        }
        await groupWithThisId.update(req.body);
        return res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(500).send('an error occured');
    }
};

module.exports = updateGroup;
