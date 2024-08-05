import TaskController from '../TaskController.js';
import TaskService from '../../../domain/services/TaskService.js';
import CustomError from '../../../utils/CustomError.js';
import logger from '../../../config/logger.js';

jest.mock('../../../domain/services/TaskService.js');
jest.mock('../../../config/logger.js');

describe('TaskController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
            query: {},
            user: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        next = jest.fn();
    });

    describe('createTask', () => {
        it('should create a task and return it', async () => {
            const task = { title: 'Test Task', description: 'Test Description', userId: 'user123' };
            req.body = { title: 'Test Task', description: 'Test Description' };
            req.user.id = 'user123';
            TaskService.prototype.createTask.mockResolvedValue(task);

            await TaskController.createTask(req, res, next);

            expect(TaskService.prototype.createTask).toHaveBeenCalledWith({ title: 'Test Task', description: 'Test Description', userId: 'user123' });
            expect(logger.info).toHaveBeenCalledWith(`Task Created ${task}`);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(task);
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            TaskService.prototype.createTask.mockRejectedValue(error);

            await TaskController.createTask(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        });
    });

    describe('getTasks', () => {
        it('should get tasks and return them', async () => {
            const tasks = [{ title: 'Task 1' }, { title: 'Task 2' }];
            const totalTasks = 2;
            req.user.id = 'user123';
            TaskService.prototype.getTasksByUserId.mockResolvedValue({ tasks, totalTasks });

            await TaskController.getTasks(req, res, next);

            expect(TaskService.prototype.getTasksByUserId).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ tasks, totalTasks, page: 1, limit: 10 });
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            TaskService.prototype.getTasksByUserId.mockRejectedValue(error);

            await TaskController.getTasks(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        });
    });

    describe('getTaskById', () => {
        it('should get a task by ID and return it', async () => {
            const task = { title: 'Test Task' };
            req.params.id = 'task123';
            TaskService.prototype.getTaskById.mockResolvedValue(task);

            await TaskController.getTaskById(req, res, next);

            expect(TaskService.prototype.getTaskById).toHaveBeenCalledWith('task123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(task);
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            TaskService.prototype.getTaskById.mockRejectedValue(error);

            await TaskController.getTaskById(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        });
    });

    describe('updateTask', () => {
        it('should update a task by ID and return it', async () => {
            const task = { title: 'Updated Task', userId: 'user123' };
            req.params.id = 'task123';
            req.body = { title: 'Updated Task', description: 'Updated Description' };
            req.user.id = 'user123';
            TaskService.prototype.getTaskById.mockResolvedValue(task);
            TaskService.prototype.updateTask.mockResolvedValue(task);

            await TaskController.updateTask(req, res, next);

            expect(TaskService.prototype.getTaskById).toHaveBeenCalledWith('task123');
            expect(TaskService.prototype.updateTask).toHaveBeenCalledWith('task123', { title: 'Updated Task', description: 'Updated Description' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(task);
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            TaskService.prototype.updateTask.mockRejectedValue(error);

            await TaskController.updateTask(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        });
    });

    describe('deleteTask', () => {
        it('should delete a task by ID', async () => {
            const task = { title: 'Test Task', userId: 'user123' };
            req.params.id = 'task123';
            req.user.id = 'user123';
            TaskService.prototype.getTaskById.mockResolvedValue(task);
            TaskService.prototype.deleteTask.mockResolvedValue();

            await TaskController.deleteTask(req, res, next);

            expect(TaskService.prototype.getTaskById).toHaveBeenCalledWith('task123');
            expect(TaskService.prototype.deleteTask).toHaveBeenCalledWith({ id: 'task123' });
            expect(logger.info).toHaveBeenCalledWith(`Task Deleted task123`);
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            TaskService.prototype.deleteTask.mockRejectedValue(error);

            await TaskController.deleteTask(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        });
    });
});
