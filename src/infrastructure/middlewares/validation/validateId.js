import { param } from 'express-validator';

const validateId = [
    param('id')
        .isMongoId().withMessage('Invalid ID format')
];

export default validateId;
