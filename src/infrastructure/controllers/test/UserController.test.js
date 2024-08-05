import passport from 'passport';

import UserController from '../../controllers/UserController.js';
import UserService from '../../../domain/services/UserService.js';
import CustomError from '../../../utils/CustomError.js';
import logger from '../../../config/logger';

jest.mock('passport');
jest.mock('../../../config/logger.js');
jest.mock('../../../domain/services/UserService.js');


describe('UserController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
            query: {},
            user: {},
            logIn: jest.fn()
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            redirect: jest.fn()
        };
        next = jest.fn();
    });

    describe('registerUser', () => {
        it('should register a new user and return a token', async () => {
            const token = 'token';
            req.body = { username: 'testuser', email: 'test@example.com', password: 'password123' };
            UserService.prototype.registerUser.mockResolvedValue(token);

            await UserController.registerUser(req, res, next);

            expect(UserService.prototype.registerUser).toHaveBeenCalledWith(req.body);
            expect(logger.info).toHaveBeenCalledWith(`User Created ${req.body.username} ${req.body.email}`);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ token });
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            UserService.prototype.registerUser.mockRejectedValue(error);

            await UserController.registerUser(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        });
    });

    describe('loginUser', () => {
        it('should login a user and return a token', async () => {
            const token = 'token';
            req.body = { email: 'test@example.com', password: 'password123' };
            UserService.prototype.loginUser.mockResolvedValue(token);

            await UserController.loginUser(req, res, next);

            expect(UserService.prototype.loginUser).toHaveBeenCalledWith(req.body.email, req.body.password);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ token });
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            UserService.prototype.loginUser.mockRejectedValue(error);

            await UserController.loginUser(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('googleLogin', () => {
        it('should initiate Google login', () => {
            const authenticateMock = jest.fn().mockReturnValue((req, res, next) => next());
            passport.authenticate.mockReturnValue(authenticateMock);

            UserController.googleLogin(req, res, next);

            expect(passport.authenticate).toHaveBeenCalledWith('google', { scope: ['profile', 'email'] });
            expect(authenticateMock).toHaveBeenCalledWith(req, res, next);
        });
    });
});
