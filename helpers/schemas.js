const schemaUserPost = require('./schemas/user.post.schema');
const schemaUserPut = require('./schemas/user.put.schema');
const schemaGroupPost = require('./schemas/group.post.schema');
const schemaGroupPut = require('./schemas/group.put.schema');
const schemaUserGroupPost = require('./schemas/usergroup.post.schema');
const schemaLoginPost = require('./schemas/login.post.schema');

module.exports = {
    schemaUserPost,
    schemaUserPut,
    schemaGroupPost,
    schemaGroupPut,
    schemaUserGroupPost,
    schemaLoginPost
};
