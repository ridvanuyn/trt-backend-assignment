import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserService from '../UserService.js';
import CustomError from '../../../utils/CustomError.js';
import ERROR_CODES from '../../../constants/errors.js';
import { jest } from '@jest/globals'


jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('UserService', () => {
    let userRepository;
    let userService;

    beforeEach(() => {
        userRepository = {
            findByEmail: jest.fn(),
            create: jest.fn(),
            findByGoogleId: jest.fn(),
            
        };
        userService = new UserService(userRepository);
    });

    describe('registerUser', () => {
        it('should register a new user and return a token', async () => {
            const user = { username: 'testuser', email: 'test@example.com', password: 'password123' };
            const hashedPassword = 'hashedPassword';
            const token = 'token';

            userRepository.findByEmail.mockResolvedValue(null);
            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue(hashedPassword);
            userRepository.create.mockResolvedValue({ ...user, password: hashedPassword });
            jwt.sign.mockResolvedValue(token);

            const result = await userService.registerUser(user);

            expect(userRepository.findByEmail).toHaveBeenCalledWith(user.email);
            expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
            expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 'salt');
            expect(userRepository.create).toHaveBeenCalledWith({
                username: user.username,
                email: user.email,
                password: hashedPassword,
            });
            expect(jwt.sign).toHaveBeenCalledWith({ user: { id: undefined } }, process.env.JWT_SECRET, { expiresIn: '1h' });
            expect(result).toBe(token);
        });

        it('should throw an error if user already exists', async () => {
            const user = { username: 'testuser', email: 'test@example.com', password: 'password123' };
            userRepository.findByEmail.mockResolvedValue(user);

            await expect(userService.registerUser(user)).rejects.toThrow(CustomError);
            await expect(userService.registerUser(user)).rejects.toMatchObject({
                message: ERROR_CODES.ALREADY_REGISTERED.message,
                code: ERROR_CODES.ALREADY_REGISTERED.code
            });
        });
    });

    describe('loginUser', () => {
        it('should login a user and return a token', async () => {
            const email = 'test@example.com';
            const password = 'password123';
            const hashedPassword = 'hashedPassword';
            const token = 'token';

            const user = { id: 'user123', email, password: hashedPassword };

            userRepository.findByEmail.mockResolvedValue(user);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockResolvedValue(token);

            const result = await userService.loginUser(email, password);

            expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
            expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
            expect(jwt.sign).toHaveBeenCalledWith({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
            expect(result).toBe(token);
        });

        it('should throw an error if user is not found', async () => {
            const email = 'test@example.com';
            const password = 'password123';

            userRepository.findByEmail.mockResolvedValue(null);

            await expect(userService.loginUser(email, password)).rejects.toThrow(CustomError);
            await expect(userService.loginUser(email, password)).rejects.toMatchObject({
                message: ERROR_CODES.INVALID_CREDENTIAL.message,
                code: ERROR_CODES.INVALID_CREDENTIAL.code
            });
        });

        it('should throw an error if password does not match', async () => {
            const email = 'test@example.com';
            const password = 'password123';
            const hashedPassword = 'hashedPassword';

            const user = { id: 'user123', email, password: hashedPassword };

            userRepository.findByEmail.mockResolvedValue(user);
            bcrypt.compare.mockResolvedValue(false);

            await expect(userService.loginUser(email, password)).rejects.toThrow(CustomError);
            await expect(userService.loginUser(email, password)).rejects.toMatchObject({
                message: ERROR_CODES.INVALID_CREDENTIAL.message,
                code: ERROR_CODES.INVALID_CREDENTIAL.code
            });
        });
    });

    describe('findOrCreateGoogleUser', () => {
        it('should find an existing Google user', async () => {
            const profile = { id: 'google123', displayName: 'Test User', emails: [{ value: 'test@example.com' }] };
            const user = { id: 'user123', googleId: profile.id, username: profile.displayName, email: profile.emails[0].value };

            userRepository.findByGoogleId.mockResolvedValue(user);

            const result = await userService.findOrCreateGoogleUser(profile);

            expect(userRepository.findByGoogleId).toHaveBeenCalledWith(profile.id);
            expect(result).toEqual(user);
        });

        it('should create a new Google user if not found', async () => {
            const profile = { id: 'google123', displayName: 'Test User', emails: [{ value: 'test@example.com' }] };
            const newUser = { id: 'user123', googleId: profile.id, username: profile.displayName, email: profile.emails[0].value };

            userRepository.findByGoogleId.mockResolvedValue(null);
            userRepository.create.mockResolvedValue(newUser);

            const result = await userService.findOrCreateGoogleUser(profile);

            expect(userRepository.findByGoogleId).toHaveBeenCalledWith(profile.id);
            expect(userRepository.create).toHaveBeenCalledWith({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value
            });
            expect(result).toEqual(newUser);
        });
    });
});
