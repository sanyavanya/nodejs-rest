const readAllGroups = async function (req, res, groupModel) {
    let allGroups = [];
    allGroups = await groupModel.findAll();
    if (allGroups.length) {
        return res.status(200).json(allGroups);
    }
    res.status(404).json({ error: 'no groups found' });
};

module.exports = readAllGroups;
