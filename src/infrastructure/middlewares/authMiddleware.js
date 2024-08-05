import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import ERROR_CODES from '../../constants/errors.js';
import CustomError from '../../utils/CustomError.js';

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return next(new CustomError('No token, authorization denied', ERROR_CODES.AUTHENTICATION_ERROR));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded.user.id).select('-password');
        next();
    } catch (err) {
        next(new CustomError('Token is not valid', ERROR_CODES.AUTHENTICATION_ERROR));
    }
};

export default authMiddleware;
