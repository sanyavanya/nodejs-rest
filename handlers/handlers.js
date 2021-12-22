const readUser = require('./user/readUser');
const createUser = require('./user/createUser');
const updateUser = require('./user/updateUser');
const deleteUser = require('./user/deleteUser');
const autoSuggest = require('./user/autoSuggest');
const getUserIdParam = require('./user/getUserIdParam');
const readGroup = require('./group/readGroup');
const readAllGroups = require('./group/readAllGroups');
const createGroup = require('./group/createGroup');
const updateGroup = require('./group/updateGroup');
const deleteGroup = require('./group/deleteGroup');
const getGroupIdParam = require('./group/getGroupIdParam');
const deleteUserGroup = require('./usergroup/deleteUserGroup');
const addUsersToGroup = require('./usergroup/addUsersToGroup');

module.exports = {
    readUser,
    createUser,
    updateUser,
    deleteUser,
    autoSuggest,
    getUserIdParam,
    readGroup,
    readAllGroups,
    createGroup,
    updateGroup,
    deleteGroup,
    getGroupIdParam,
    deleteUserGroup,
    addUsersToGroup
};
