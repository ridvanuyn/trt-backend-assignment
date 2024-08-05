import { createLogger, format as _format, transports as _transports } from 'winston';

const logger = createLogger({
    level: process.env.LOG_LEVEL,
    format: _format.combine(
        _format.timestamp(),
        _format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new _transports.Console(),
        new _transports.File({ filename: 'logs/error.log', level: 'error' }),
        new _transports.File({ filename: 'logs/combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new _transports.Console({
        format: _format.simple()
    }));
}

export default logger;
