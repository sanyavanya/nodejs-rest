const winston = require("winston");
const isReqLoggingEnabled = process.env.REQ_LOGGING === "enabled";

winston.configure({
  transports: [
    new winston.transports.File({ filename: "errors.log", level: "info" }),
  ],
});

const logServiceMethod = (req, res, next) => {
  if (isReqLoggingEnabled)
    console.log(
      `Method: ${req.method}, request body: ${JSON.stringify(req.body)}`
    );
  // console.log(req.headers);
  next();
};

const logError = (error, req, res, next) => {
  if (error) {
    const errorCode = error.code || 500;
    const errorMessage = error.message || "Internal Server Error";
    winston.error(`${errorCode} ${errorMessage}`);
    res.status(errorCode).send(errorMessage);
  }
  next();
};

const logUncaughtException = (error, origin) => {
  winston.error(`Uncaught exception ${error} at ${origin}`);
};

const logUnhandledRejection = (error) => {
  winston.error(`Uncaught promise rejection: ${error}`);
};

module.exports = {
  logServiceMethod,
  logError,
  logUncaughtException,
  logUnhandledRejection,
};
