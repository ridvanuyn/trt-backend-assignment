import UserModel from '../models/UserModel.js';

class UserRepository {
    async create(user) {
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    async findByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async findByGoogleId(googleId) {
        return UserModel.findOne({ googleId });
      }
}

export default UserRepository;
