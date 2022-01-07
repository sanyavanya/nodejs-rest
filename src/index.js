require("dotenv").config(); // should be disabled for production
const config = require("../config");
const app = require("./app");

app.listen(config.PORT);
