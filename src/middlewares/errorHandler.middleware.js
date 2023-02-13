const logger = require("../config/logger.config");
const checkIsDev = require("../utils/checkIsDev");

module.exports = (err, req, res, next) => {
  const isDev = checkIsDev();

  let errorMessage = err.message

  logger.error(err);
  res.status(500).json({
    status: "error",
    error: {
      message: errorMessage,
      details: isDev ? err.stack : "",
    },
  });
};
