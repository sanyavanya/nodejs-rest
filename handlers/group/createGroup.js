const uuid = require('uuid');

const createGroup = async function (req, res, groupModel) {
    try {
        const groupWithThisName = await groupModel.findOne({
            where: {
                name: req.body.name
            }
        });
        if (groupWithThisName) {
            return res
                .status(400)
                .json({ error: 'group with this name already exists' });
        }
        await groupModel.create({
            id: uuid.v4(),
            ...req.body
        });
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(500).send('an error occured');
    }
    res.status(201).send();
};

module.exports = createGroup;
