import TaskModel from '../models/TaskModel.js';

class TaskRepository {
    async create(task) {
        const newTask = new TaskModel(task);
        return await newTask.save();
    }

    async getTasksByUserId(userId, filter, sort, skip, limit) {

        const query = { userId, ...filter };
        const tasks = await TaskModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);
        return tasks;
    }

    async findById(taskId) {
        return await TaskModel.findById(taskId);
    }

    async update(taskId, task) {
        return await TaskModel.findByIdAndUpdate(taskId, task, { new: true });
    }

    async delete(taskId) {
        const { id } = taskId;
        return await TaskModel.findByIdAndDelete(id);
    }

    async countTasksByUserId(userId, filter) {
        const query = { userId, ...filter };
        return await TaskModel.countDocuments(query);
    }
}

export default TaskRepository;
