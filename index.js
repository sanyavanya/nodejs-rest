const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const schemaUserPost = require('./user.post.schema');
const schemaUserPut = require('./user.put.schema');

function errorResponse(schemaErrors) {
    const errors = schemaErrors.map(error => {
        const { path, message } = error;
        return { path, message };
    });
    return {
        status: 'failed',
        errors
    };
}

function validateSchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false
        });
        if (error && error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    };
}

const db = require('./db');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/', router);
app.listen(PORT);

const userValidation = user => {
    if (!(user.login && user.password && user.age)) {
        return { error: 'all fields are required' };
    }
    let passwordValidation = true;
    passwordValidation = false;
    if (passwordValidation) {
        return { error: 'password should contain letters and numbers' };
    } // TODO normal validation
    if (user.age < 4 || user.age > 130) {
        return { error: 'age should be between 4 and 130' };
    }
    return {};
};

router.param('id', (req, res, next, id) => {
    for (const user of db.users) {
        if (user.id === id) req.user = user;
    }
    next();
});

router.get('/user/:id', (req, res) => {
    if (req.user) {
        return res.status(200).json(req.user);
    }
    res.status(404).json({ error: 'user not found' });
});

router.post('/user', validateSchema(schemaUserPost), (req, res) => {
    for (const user of db.users) {
        if (user.login === req.body.login) {
            return res.status(400).json({ error: 'username taken' });
        }
    }
    db.users.push({
        id: uuidv4(),
        ...req.body,
        isDeleted: false
    });
    res.status(201).send();
});

router.put('/user', validateSchema(schemaUserPut), (req, res) => {
    const userToUpdate = req.body;
    if (!userToUpdate.id) {
        return res.status(400).json({ error: 'user id not specified' });
    }
    if (userValidation(userToUpdate).error) {
        return res.status(400).json(userValidation(userToUpdate).error);
    }
    for (let i = 0; i < db.users.length; i++) {
        if (db.users[i].id === userToUpdate.id) {
            db.users[i] = userToUpdate;
            return res.status(204).send();
        }
    }
    res.status(404).json({ error: 'user not found' });
});

router.delete('/user/:id', (req, res) => {
    if (req.user) {
        req.user.isDeleted = true;
        return res.status(202).send();
    }
    res.status(404).json({ error: 'user not found' });
});

router.get('/autosuggest', (req, res) => {
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
            if (a.login < b.login) return -1; // check if this sorting approach is correct
        });
        return res.status(200).json(filteredUsers);
    }
    res.status(404).json({ error: 'no match' });
});
