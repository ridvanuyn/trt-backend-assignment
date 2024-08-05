import jwt from 'jsonwebtoken';
import UserModel from '../../models/UserModel.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import CustomError from '../../../utils/customError.js';
import ERROR_CODES from '../../../constants/errors.js';

jest.mock('jsonwebtoken');
jest.mock('../../models/UserModel.js');

describe('authMiddleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            header: jest.fn().mockReturnValue('Bearer token'),
        };
        res = {};
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call next with an error if no token is provided', async () => {
        req.header = jest.fn().mockReturnValue('');

        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        const error = next.mock.calls[0][0];
        expect(error.message).toBe(ERROR_CODES.AUTHENTICATION_ERROR.message);
        expect(error.code).toBe(ERROR_CODES.AUTHENTICATION_ERROR.code);
    });

    it('should call next with an error if token is invalid', async () => {
        jwt.verify.mockImplementation(() => { throw new Error('Token is not valid'); });

        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        const error = next.mock.calls[0][0];
        expect(error.message).toBe(ERROR_CODES.AUTHENTICATION_TIMEOUT_ERROR.message);
        expect(error.code).toBe(ERROR_CODES.AUTHENTICATION_TIMEOUT_ERROR.code);
    });

    it('should call next with an error if user is not found', async () => {
        const decoded = { user: { id: 'userId' } };
        jwt.verify.mockReturnValue(decoded);
        UserModel.findById.mockResolvedValue(null);

        authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        const error = next.mock.calls[0][0];

        expect(error.message).toBe(ERROR_CODES.AUTHENTICATION_TIMEOUT_ERROR.message);
        expect(error.code).toBe(ERROR_CODES.AUTHENTICATION_TIMEOUT_ERROR.code);
    });

    it('should set req.user and call next if token and user are valid', async () => {
        const decoded = { user: { id: 'userId' } };
        const user = { id: 'userId', name: 'Test User' };
        jwt.verify.mockReturnValue(decoded);
        UserModel.findById.mockResolvedValue(user);

        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});
