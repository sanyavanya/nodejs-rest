const { Op } = require('sequelize');
const User = require('../../models/User');

const autoSuggest = async function (req, res, next) {
    try {
        const filteredUsers = await User.findAll({
            where: {
                login: {
                    [Op.like]: `%${req.query.loginSubstring}%`
                }
            },
            limit: req.query.limit
        });
        if (filteredUsers.length) {
            res.status(200).json(filteredUsers);
            next();
        }
        next({ code: 404, message: 'No Match' });
    } catch (err) {
        next(err);
    }
};

module.exports = autoSuggest;
