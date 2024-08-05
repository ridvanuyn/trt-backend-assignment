import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import ERROR_CODES from '../../constants/errors.js';
import CustomError from '../../utils/CustomError.js';

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return next(new CustomError(
            ERROR_CODES.AUTHENTICATION_ERROR.message,
            ERROR_CODES.AUTHENTICATION_ERROR.code));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.user.id).select('-password');
        if (!user) {
            next(new CustomError(
                ERROR_CODES.NOT_FOUND_ERROR.message,
                ERROR_CODES.NOT_FOUND_ERROR.code));
        }
        req.user = user;
        next();
    } catch (err) {
        next(new CustomError(
            ERROR_CODES.AUTHENTICATION_TIMEOUT_ERROR.message,
            ERROR_CODES.AUTHENTICATION_TIMEOUT_ERROR.code));
    }
};

export default authMiddleware;
