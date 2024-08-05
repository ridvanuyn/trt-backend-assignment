class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async createTask(task) {
        return await this.taskRepository.create(task);
    }

    async getTasksByUserId(userId, filter, sort, page, limit) {
        const skip = (page - 1) * limit;
        const [tasks, totalTasks] = await Promise.all([
            this.taskRepository.getTasksByUserId(userId, filter, sort, skip, limit),
            this.taskRepository.countTasksByUserId(userId, filter)
        ]);
        return { tasks, totalTasks, page, limit };

    }

    async getTaskById(taskId) {
        return await this.taskRepository.findById(taskId);
    }

    async updateTask(taskId, task) {
        return await this.taskRepository.update(taskId, task);
    }

    async deleteTask(taskId) {
        return await this.taskRepository.delete(taskId);
    }
}

export default TaskService;
