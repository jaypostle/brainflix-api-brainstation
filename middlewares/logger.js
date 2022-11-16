const moment = require("moment");

// a middleware for logging api requests made to the server
const logger = (req, _res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    } : ${moment().format()}`
  );

  // very important to make sure to pass the api call to next middleware or response cycle
  next();
};

module.exports = logger;
