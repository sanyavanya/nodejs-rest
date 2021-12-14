const readUser = require('./user/readUser');
const createUser = require('./user/createUser');
const updateUser = require('./user/updateUser');
const deleteUser = require('./user/deleteUser');
const autosuggest = require('./user/autosuggest');
const readGroup = require('./group/readGroup');
const readAllGroups = require('./group/readAllGroups');
const createGroup = require('./group/createGroup');
const updateGroup = require('./group/updateGroup');
const deleteGroup = require('./group/deleteGroup');
const deleteUserGroup = require('./usergroup/deleteUserGroup');
const addUsersToGroup = require('./usergroup/addUsersToGroup');

module.exports = {
    readUser,
    createUser,
    updateUser,
    deleteUser,
    autosuggest,
    readGroup,
    readAllGroups,
    createGroup,
    updateGroup,
    deleteGroup,
    deleteUserGroup,
    addUsersToGroup
};
