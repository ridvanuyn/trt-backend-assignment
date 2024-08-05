import TaskService from '../TaskService.js';

describe('TaskService', () => {
    let taskRepository;
    let taskService;

    beforeEach(() => {
        taskRepository = {
            create: jest.fn(),
            getTasksByUserId: jest.fn(),
            countTasksByUserId: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        taskService = new TaskService(taskRepository);
    });

    describe('createTask', () => {
        it('should create a task', async () => {
            const task = { title: 'Test Task', description: 'Test Description' };
            taskRepository.create.mockResolvedValue(task);

            const result = await taskService.createTask(task);

            expect(taskRepository.create).toHaveBeenCalledWith(task);
            expect(result).toEqual(task);
        });
    });

    describe('getTasksByUserId', () => {
        it('should get tasks by user ID with pagination, filtering and sorting', async () => {
            const userId = 'user123';
            const filter = {};
            const sort = { createdAt: 1 };
            const page = 1;
            const limit = 10;
            const skip = 0;
            const tasks = [{ title: 'Task 1' }, { title: 'Task 2' }];
            const totalTasks = 2;

            taskRepository.getTasksByUserId.mockResolvedValue(tasks);
            taskRepository.countTasksByUserId.mockResolvedValue(totalTasks);

            const result = await taskService.getTasksByUserId(userId, filter, sort, page, limit);

            expect(taskRepository.getTasksByUserId).toHaveBeenCalledWith(userId, filter, sort, skip, limit);
            expect(taskRepository.countTasksByUserId).toHaveBeenCalledWith(userId, filter);
            expect(result).toEqual({ tasks, totalTasks, page, limit });
        });
    });

    describe('getTaskById', () => {
        it('should get a task by ID', async () => {
            const taskId = 'task123';
            const task = { title: 'Test Task' };
            taskRepository.findById.mockResolvedValue(task);

            const result = await taskService.getTaskById(taskId);

            expect(taskRepository.findById).toHaveBeenCalledWith(taskId);
            expect(result).toEqual(task);
        });
    });

    describe('updateTask', () => {
        it('should update a task by ID', async () => {
            const taskId = 'task123';
            const updatedTask = { title: 'Updated Task' };
            taskRepository.update.mockResolvedValue(updatedTask);

            const result = await taskService.updateTask(taskId, updatedTask);

            expect(taskRepository.update).toHaveBeenCalledWith(taskId, updatedTask);
            expect(result).toEqual(updatedTask);
        });
    });

    describe('deleteTask', () => {
        it('should delete a task by ID', async () => {
            const taskId = 'task123';
            taskRepository.delete.mockResolvedValue(true);

            const result = await taskService.deleteTask(taskId);

            expect(taskRepository.delete).toHaveBeenCalledWith(taskId);
            expect(result).toEqual(true);
        });
    });
});
