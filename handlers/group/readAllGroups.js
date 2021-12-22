const Group = require('../../models/Group');

const readAllGroups = async function (req, res, next) {
    try {
        let allGroups = [];
        allGroups = await Group.findAll();
        if (allGroups.length) {
            return res.status(200).json(allGroups);
        }
        next({ code: 404, message: 'No Groups Found' });
    } catch (err) {
        next(err);
    }
};

module.exports = readAllGroups;
