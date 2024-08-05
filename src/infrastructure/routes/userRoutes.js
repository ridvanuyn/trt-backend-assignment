import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

router.get('/google', UserController.googleLogin);
router.get('/google/callback', UserController.googleCallback);

export default router;
