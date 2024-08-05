import express from 'express';
import TaskController from '../controllers/TaskController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validateTask from '../middlewares/validation/validateTask.js';
import { handleValidationErrors } from '../middlewares/validation/handleValidationErrors.js';
import validateId from '../middlewares/validation/validateId.js';

const router = express.Router();

router.post('/', authMiddleware, validateTask, handleValidationErrors, TaskController.createTask);
router.get('/', authMiddleware, TaskController.getTasks);
router.get('/:id', authMiddleware, validateId, handleValidationErrors, TaskController.getTaskById);
router.put('/:id', authMiddleware, validateId, validateTask, handleValidationErrors, TaskController.updateTask);
router.delete('/:id', authMiddleware, validateId, handleValidationErrors, TaskController.deleteTask);

export default router;
