const generalMessage = require("../../errorMessages/general.message");

module.exports = (res, message) => {
    return res.status(404).json({
        status: "error",
        error: {
            message: message ?? generalMessage.notFoundError
        },
    });
};
