require('dotenv').config();

const express = require('express');
const handlers = require('./handlers/handlers');
const schemaUserPost = require('./helpers/user.post.schema');
const schemaUserPut = require('./helpers/user.put.schema');
const schemaGroupPost = require('./helpers/group.post.schema');
const schemaGroupPut = require('./helpers/group.put.schema');
const validateSchema = require('./helpers/validateSchema');

const User = require('./models/User');
const Group = require('./models/Group');
const UserGroup = require('./models/UserGroup');

const app = express();
const router = express.Router();
const PORT = 4000;
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

router.param('groupId', async (req, res, next, id) => {
    try {
        const somt = await Group.findAll();
        console.log(somt);
        const groupWithThisId = await Group.findByPk(id);
        req.group = groupWithThisId;
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

router.delete('/user/:id', (req, res) => {
    handlers.deleteUser(req, res, User);
    handlers.deleteUserGroup(UserGroup, { userId: req.user.id });
});

router.get('/autosuggest', (req, res) => handlers.autosuggest(req, res, User));

router.get('/group/:groupId', (req, res) => handlers.readGroup(req, res));

router.get('/groups', (req, res) => handlers.readAllGroups(req, res, Group));

router.post('/group', validateSchema(schemaGroupPost), (req, res) =>
    handlers.createGroup(req, res, Group)
);

router.put('/group', validateSchema(schemaGroupPut), (req, res) =>
    handlers.updateGroup(req, res, Group)
);

router.delete('/group/:groupId', (req, res) => {
    handlers.deleteGroup(req, res, Group);
    handlers.deleteUserGroup(UserGroup, { groupId: req.group.id });
});
