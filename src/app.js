import express from 'express';
import connectDB from './config/database.js';
import passport from './config/passport.js';
import taskRoutes from './infrastructure/routes/taskRoutes.js';
import userRoutes from './infrastructure/routes/userRoutes.js';
import errorHandler from './infrastructure/middlewares/errorHandler.js';
import logger from './config/logger.js';
import dotenv from 'dotenv';
import session from 'express-session';
import rateLimiter from './config/rateLimiter.js';
import helmet from 'helmet';
dotenv.config();

const app = express();

app.use(helmet());

connectDB();

app.use(express.json());
app.use(passport.initialize());

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.session());

app.use(rateLimiter);
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
