require('dotenv').config();
const User = require('../../models/User');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');


const login = async function (req, res, next) {
    try {
        const userWithThisLogin = await User.findOne({
            where: {
                login: req.body.login
            }
        });
        if (userWithThisLogin && req.body.password === userWithThisLogin.password) {
            const token = jwt.sign(userWithThisLogin.dataValues, process.env.SECRET, { expiresIn: 60 });
            res.status(200).send(token);
        } else {
            next({ code: 403, message: 'Incorrect Username or Password' });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = login;
