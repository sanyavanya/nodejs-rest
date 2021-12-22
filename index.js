require('dotenv').config();

const express = require('express');
const process = require('process');
const handlers = require('./handlers/handlers');
const schemas = require('./helpers/schemas');
const validateSchema = require('./helpers/validateSchema');
const logger = require('./helpers/logger');
const User = require('./models/User');
const Group = require('./models/Group');

User.belongsToMany(Group, { through: 'UserGroup', foreignKey: 'groupId' });
Group.belongsToMany(User, { through: 'UserGroup', foreignKey: 'userId' });

const app = express();
const router = express.Router();
const PORT = 4000;

app.use(express.json());
app.use(logger.logServiceMethod);
app.use('/', router);

process.on('uncaughtException', logger.logUncaughtException);
process.on('unhandledRejection', logger.logUnhandledRejection);

router.param('id', handlers.getUserIdParam);
router.param('groupId', handlers.getGroupIdParam);
router.get('/user/:id', handlers.readUser);
router.post('/user', validateSchema(schemas.schemaUserPost), handlers.createUser);
router.put('/user', validateSchema(schemas.schemaUserPut), handlers.updateUser);
router.delete('/user/:id', handlers.deleteUser);
router.get('/autosuggest', handlers.autoSuggest);
router.get('/group/:groupId', handlers.readGroup);
router.get('/groups', handlers.readAllGroups);
router.post('/group', validateSchema(schemas.schemaGroupPost), handlers.createGroup);
router.put('/group', validateSchema(schemas.schemaGroupPut), handlers.updateGroup);
router.delete('/group/:groupId', handlers.deleteGroup);
router.post('/addUsersToGroup', validateSchema(schemas.schemaUserGroupPost), handlers.addUsersToGroup);

app.use(logger.logError);

app.listen(PORT);
