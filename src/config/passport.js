import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserService from '../domain/services/UserService.js';
import UserRepository from '../infrastructure/repositories/UserRepository.js';
import dotenv from 'dotenv';
dotenv.config();

const userService = new UserService(new UserRepository());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (token, tokenSecret, profile, done) => {
    try {
      const user = await userService.findOrCreateGoogleUser(profile);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.userRepository.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

export default passport;
