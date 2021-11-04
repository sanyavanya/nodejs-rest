const express = require('express');
const router = express.Router();

const schemaUserPost = require('./helpers/user.post.schema');
const schemaUserPut = require('./helpers/user.put.schema');

const validateSchema = require('./helpers/validateSchema');
const handlers = require('./handlers/handlers');

const db = require('./models/db');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/', router);
app.listen(PORT);

router.param('id', (req, res, next, id) => {
    for (const user of db.users) {
        if (user.id === id) req.user = user;
    }
    next();
});

router.get('/user/:id', (req, res) => handlers.readUser(req, res, db));

router.post('/user', validateSchema(schemaUserPost), (req, res) =>
    handlers.createUser(req, res, db)
);

router.put('/user', validateSchema(schemaUserPut), (req, res) =>
    handlers.updateUser(req, res, db)
);

router.delete('/user/:id', (req, res) => handlers.deleteUser(req, res, db));

router.get('/autosuggest', (req, res) => handlers.autosuggest(req, res, db));
