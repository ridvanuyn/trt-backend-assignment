import { connect } from 'mongoose';
import ERROR_CODES from '../constants/errors.js';
import CustomError from '../utils/CustomError.js';
import logger from './logger.js';

const connectDB = async () => {
    const { DATABASE_CONNECTION_ERROR } = ERROR_CODES
    try {
        await connect(process.env.MONGODB_URI);
        logger.info('MongoDB connected');
    } catch (error) {
        logger.error(`Database connection failed: ${error.message}`);
        throw new CustomError('Database connection failed', DATABASE_CONNECTION_ERROR);
    }
};

export default connectDB;