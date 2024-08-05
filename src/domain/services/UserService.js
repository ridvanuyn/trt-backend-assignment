import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ERROR_CODES from '../../constants/errors.js';
import CustomError from '../../utils/CustomError.js';

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async registerUser(user) {
        const { username, email, password } = user;
        let existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
             throw new CustomError(ERROR_CODES.ALREADY_REGISTERED.message, ERROR_CODES.ALREADY_REGISTERED.code);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await this.userRepository.create({
            username,
            email,
            password: hashedPassword,
        });
        const token = await this.generateToken(newUser);
        return token;
    }

    async loginUser(email, password) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new CustomError(ERROR_CODES.INVALID_CREDENTIAL.message, ERROR_CODES.INVALID_CREDENTIAL.code);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new CustomError(ERROR_CODES.INVALID_CREDENTIAL.message, ERROR_CODES.INVALID_CREDENTIAL.code);
        }

        const token = await this.generateToken(user);

        return token;
    }

    async findOrCreateGoogleUser(profile) {
        let user = await this.userRepository.findByGoogleId(profile.id);

        if (!user) {
            user = await this.userRepository.create({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value
            });
        }

        return user;
    }

    async generateToken(user) {
        return jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
    }
}

export default UserService;
