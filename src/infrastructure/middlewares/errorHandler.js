import logger from '../../config/logger.js';
import ERROR_CODES from '../../constants/errors.js';


const errorHandler = (err, req, res, next) => {
    console.log(err.code,"hoo")
    const error = Object.values(ERROR_CODES).find(ec => ec.code === err.code) || ERROR_CODES.UNKNOWN_ERROR;


    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message:  error.message,
        code: error.code,
        details: err.details || []
    });
};

export default errorHandler;
