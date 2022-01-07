const express = require("express");
const cors = require("cors");
const process = require("process");
const handlers = require("./handlers/handlers");
const schemas = require("./helpers/schemas");
const validateSchema = require("./helpers/validateSchema");
const logger = require("./helpers/logger");
const checkToken = require("./helpers/checkToken");
const User = require("./models/User");
const Group = require("./models/Group");

// Define many-to-many relationship
User.belongsToMany(Group, { through: "UserGroup", foreignKey: "groupId" });
Group.belongsToMany(User, { through: "UserGroup", foreignKey: "userId" });

// Create app and use middleware
const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());
app.use(logger.logServiceMethod);
// app.use(checkToken);
app.use("/", router);

// Log process errors
process.on("uncaughtException", logger.logUncaughtException);
process.on("unhandledRejection", logger.logUnhandledRejection);

// Inject params
router.param("id", handlers.getUserIdParam);
router.param("groupId", handlers.getGroupIdParam);

// Handlers: Login
router.post("/login", validateSchema(schemas.schemaLoginPost), handlers.login);

// Handlers: User
router.get("/user/:id", handlers.readUser);
router.post(
  "/user",
  validateSchema(schemas.schemaUserPost),
  handlers.createUser
);
router.put("/user", validateSchema(schemas.schemaUserPut), handlers.updateUser);
router.delete("/user/:id", handlers.deleteUser);
router.get("/autosuggest", handlers.autoSuggest);

// Handlers: Group
router.get("/group/:groupId", handlers.readGroup);
router.get("/groups", handlers.readAllGroups);
router.post(
  "/group",
  validateSchema(schemas.schemaGroupPost),
  handlers.createGroup
);
router.put(
  "/group",
  validateSchema(schemas.schemaGroupPut),
  handlers.updateGroup
);
router.delete("/group/:groupId", handlers.deleteGroup);

// Handlers: UserGroup
router.post(
  "/addUsersToGroup",
  validateSchema(schemas.schemaUserGroupPost),
  handlers.addUsersToGroup
);

// Log errors and listen
app.use(logger.logError);

module.exports = app;
