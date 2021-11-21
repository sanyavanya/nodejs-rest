const { Op } = require('sequelize');

const autosuggest = async function (req, res, userModel) {
    try {
        const filteredUsers = await userModel.findAll({
            where: {
                login: {
                    [Op.like]: `%${req.query.loginSubstring}%`
                }
            },
            limit: req.query.limit
        })
        if (filteredUsers.length) return res.status(200).json(filteredUsers);
        res.status(404).json({ error: 'no match' });
    } catch(err) {
        console.log(err);
        res.status(500).send('an error occured');
    }
}

module.exports = autosuggest;
