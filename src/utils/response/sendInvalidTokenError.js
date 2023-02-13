const statusTypeEnum = require("../../enums/statusType.enum");
const authMessage = require("../../errorMessages/auth.message");

module.exports = (res) => {
    return res.status(401).json({
        status: statusTypeEnum.error,
        error: {
            message: authMessage.invalidTokenErrorMessage
        },
    });
};
