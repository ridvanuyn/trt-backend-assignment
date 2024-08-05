import passport from 'passport';
import UserService from '../../domain/services/UserService.js';
import UserRepository from '../repositories/UserRepository.js';
import ERROR_CODES from '../../constants/errors.js';
import CustomError from '../../utils/CustomError.js';
import logger from '../../config/logger.js';

const userService = new UserService(new UserRepository());

class UserController {
    async registerUser(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const token = await userService.registerUser({ username, email, password });
            logger.info(`User Created ${username} ${email}`)
            res.status(201).json({ token });
        } catch (error) {
            next(new CustomError(
                ERROR_CODES.ALREADY_REGISTERED.message,
                ERROR_CODES.ALREADY_REGISTERED.code));
        }
    }

    async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await userService.loginUser(email, password);
            res.status(200).json({ token });
        } catch (error) {
            next(new CustomError(
                ERROR_CODES.AUTHENTICATION_ERROR.message,
                ERROR_CODES.AUTHENTICATION_ERROR.code));
        }
    }

    googleLogin(req, res, next) {
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
    }

    googleCallback(req, res, next) {
        passport.authenticate('google',
            { failureRedirect: '/api/users/login' }, async (err, user, info) => {
                if (err) {
                    next(new CustomError(
                        ERROR_CODES.GOOGLE_AUTHENTICATION_ERROR.message,
                        ERROR_CODES.GOOGLE_AUTHENTICATION_ERROR.code));
                }
                if (!user) {
                    return res.redirect('/login');
                }
                req.logIn(user, async (err) => {
                    if (err) {
                        next(new CustomError(
                            ERROR_CODES.GOOGLE_AUTHENTICATION_ERROR.message,
                            ERROR_CODES.GOOGLE_AUTHENTICATION_ERROR.code));
                    }
                    const token = await userService.generateToken(user);
                    res.status(200).json({ token });
                });
            })(req, res, next);
    }
}

export default new UserController();
