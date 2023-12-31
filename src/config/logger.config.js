const { createLogger, format, transports } = require("winston");

const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.Console(),
    ]
},
);

module.exports = logger