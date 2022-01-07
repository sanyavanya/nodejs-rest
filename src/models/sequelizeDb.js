const { Sequelize } = require("sequelize");

const isDbLoggingEnabled = process.env.DB_LOGGING === "enabled";

const sequelizeOptions = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

if (!isDbLoggingEnabled) sequelizeOptions.logging = false;

const sequelize = new Sequelize(process.env.DATABASE_URI, sequelizeOptions);

sequelize
  .authenticate()
  .then(() => {
    if (isDbLoggingEnabled)
      console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    if (isDbLoggingEnabled)
      console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
