const checkIsDev = require("../utils/checkIsDev");

module.exports = (err, req, res, next) => {
  const isDev = checkIsDev();
  if (err && err.error && err.error.isJoi) {
    let errorMessageList = {};

    err.error.details.forEach((errorMessage) => {
      let errorMessageKey = errorMessage.path.pop();
      errorMessageList[errorMessageKey] = errorMessage.message.replaceAll(
        '"',
        ""
      );
    });
    res.status(400).json({
      status: "error",
      error: {
        message: errorMessageList,
        details: isDev ? err.stack : "",
      },
    });
  } else {
    next(err);
  }
};
