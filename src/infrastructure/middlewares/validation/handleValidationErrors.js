import { validationResult } from 'express-validator';
import CustomError from '../../../utils/customError.js';
import ERROR_CODES from '../../../constants/errors.js';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new CustomError(
            ERROR_CODES.VALIDATION_ERROR.message, 
            ERROR_CODES.VALIDATION_ERROR.code, errors.array()));
    }
    next();
};
