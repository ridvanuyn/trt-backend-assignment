import { check } from 'express-validator';

const validateUser = [
    check('email')
        .notEmpty().withMessage('Email is required')
        .isString().withMessage('Email must be a string')
        .isEmail().withMessage('Email must be a valid email address'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
];

export default validateUser;
