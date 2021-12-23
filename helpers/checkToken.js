require('dotenv').config();
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    if (req.path.split('/')[1] === 'login') {
        next();
    } else {
        const token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    next({ code: 401, message: 'Token Authentication Failed'});
                } else {
                    next();
                }
            })
        } else {
            next({ code: 403, message: 'No Token Provided'});
        }
    }
};

module.exports = checkToken;
