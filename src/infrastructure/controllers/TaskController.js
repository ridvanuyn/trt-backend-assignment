import TaskService from '../../domain/services/TaskService.js';
import TaskRepository from '../repositories/TaskRepository.js';
import ERROR_CODES from '../../constants/errors.js';
import CustomError from '../../utils/CustomError.js';
import logger from '../../config/logger.js';

const taskService = new TaskService(new TaskRepository());

class TaskController {
    async createTask(req, res, next) {
        try {
            const { title, description } = req.body;
            const userId = req.user.id;
            const task = await taskService.createTask({ title, description, userId });
            logger.info(`Task Created ${task}`)
            res.status(201).json(task);
        } catch (error) {
            next(new CustomError(ERROR_CODES.UNKNOWN_ERROR.message, ERROR_CODES.UNKNOWN_ERROR.code, error.details));
        }


    }

    async getTasks(req, res, next) {
        try {
            const userId = req.user.id;
            const { page = 1, limit = 10, sort = 'createdAt', order = 'asc', title, description } = req.query;

            const filter = {};
            if (title) filter.title = new RegExp(title, 'i');
            if (description) filter.description = new RegExp(description, 'i');

            const sortOption = { [sort]: order === 'asc' ? 1 : -1 };

            const { tasks, totalTasks } = await taskService.getTasksByUserId(userId, filter, sortOption, parseInt(page), parseInt(limit));
            res.status(200).json({ tasks, totalTasks, page: parseInt(page), limit: parseInt(limit) });
        } catch (error) {
            logger.error(error)
            next(new CustomError(ERROR_CODES.OPERATION_NOT_COMLETED.message, ERROR_CODES.OPERATION_NOT_COMLETED.code));
        }
    }


    async getTaskById(req, res, next) {
        try {
            const { id } = req.params;
            const task = await taskService.getTaskById(id);
            res.status(200).json(task);
        } catch (error) {
            next(new CustomError(ERROR_CODES.NOT_FOUND_ERROR.message, ERROR_CODES.NOT_FOUND_ERROR.code));
        }
    }

    async updateTask(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description } = req.body;
            const user = req.user;

            const task = await taskService.getTaskById(id);
            if (!task) {
                next(new CustomError(ERROR_CODES.NOT_FOUND_ERROR.message, ERROR_CODES.NOT_FOUND_ERROR.code));
            }

            if (task.userId.toString() !== user.id.toString()) {
                next(new CustomError(ERROR_CODES.AUTHORIZATION_ERROR.message, ERROR_CODES.AUTHORIZATION_ERROR.code));
            }

            const updatedTask = await taskService.updateTask(id, { title, description });
            res.status(200).json(updatedTask);
        } catch (error) {
            console.log(error)
            next(new CustomError(ERROR_CODES.OPERATION_NOT_COMLETED.message, ERROR_CODES.OPERATION_NOT_COMLETED.code));
        }
    }

    async deleteTask(req, res, next) {
        try {
            const { id } = req.params;
            const user = req.user;

            const task = await taskService.getTaskById(id);
            if (!task) {
                next(new CustomError(ERROR_CODES.NOT_FOUND_ERROR.message, ERROR_CODES.NOT_FOUND_ERROR.code));
            }

            if (task.userId.toString() !== user.id.toString()) {
                next(new CustomError(ERROR_CODES.AUTHORIZATION_ERROR.message, ERROR_CODES.AUTHORIZATION_ERROR.code));
            }

            await taskService.deleteTask({ id });
            logger.info(`Task Deleted ${id}`)
            res.status(204).send();
        } catch (error) {
            console.log(error)
            next(new CustomError(ERROR_CODES.OPERATION_NOT_COMLETED.message, ERROR_CODES.OPERATION_NOT_COMLETED.code));
        }
    }
}

export default new TaskController();
