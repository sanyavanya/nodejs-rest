require('dotenv').config();

const express = require('express');
const handlers = require('./handlers/handlers');
const schemaUserPost = require('./helpers/user.post.schema');
const schemaUserPut = require('./helpers/user.put.schema');
const validateSchema = require('./helpers/validateSchema');

const User = require('./models/User');

const app = express();
const router = express.Router();
const PORT = 3000;
app.use(express.json());
app.use('/', router);
app.listen(PORT);

router.param('id', async (req, res, next, id) => {
    try {
        const userWithThisId = await User.findByPk(id);
        req.user = userWithThisId;
    } catch (err) {
        console.log(err);
    }
    next();
});

router.get('/user/:id', (req, res) => handlers.readUser(req, res));

router.post('/user', validateSchema(schemaUserPost), (req, res) =>
    handlers.createUser(req, res, User)
);

router.put('/user', validateSchema(schemaUserPut), (req, res) =>
    handlers.updateUser(req, res, User)
);

router.delete('/user/:id', (req, res) => handlers.deleteUser(req, res, User));

router.get('/autosuggest', (req, res) => handlers.autosuggest(req, res, User));
