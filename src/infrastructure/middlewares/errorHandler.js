import CustomError from '../../utils/CustomError.js';
import ERROR_CODES from '../../constants/errors.js';
import logger from '../../config/logger.js';

const errorHandler = (err, req, res, next) => {

    let error = err;

    if (!(err instanceof CustomError)) {
        const errorCode = Object.values(
            ERROR_CODES).find(ec =>
                ec.code === err.code) || ERROR_CODES.UNKNOWN_ERROR;
        error = new CustomError(
            err.message || errorCode.message,
            err.code || errorCode.code,
            err.details
        );
    }

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    logger.error(err);
    res.status(statusCode).json({
        message: error.message,
        code: error.code,
        details: error.details
    });
};

export default errorHandler;
