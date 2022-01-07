require("dotenv").config(); // should be disabled for production
const config = require("../config");
const app = require("./app");
const User = require("../../../src/models/User");

console.log(config.PORT);
console.log("config.PORT");
app.listen(config.PORT);
