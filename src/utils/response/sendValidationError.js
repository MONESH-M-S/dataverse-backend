const statusTypeEnum = require("../../enums/statusType.enum");

module.exports = (res, message) => {
  return res.status(400).json({
    status: statusTypeEnum.error,
    error: {
      message,
    },
  });
};
