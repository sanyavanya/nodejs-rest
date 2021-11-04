const autosuggest = function (req, res, db) {
    const filteredUsers = [];
    for (const user of db.users) {
        if (
            user.login.includes(req.query.loginSubstring) &&
      filteredUsers.length < req.query.limit
        ) {
            filteredUsers.push(user);
        }
    }
    if (filteredUsers.length > 0) {
        filteredUsers.sort((a, b) => {
            if (a.login < b.login) return -1;
        });
        return res.status(200).json(filteredUsers);
    }
    res.status(404).json({ error: 'no match' });
};

module.exports = autosuggest;
