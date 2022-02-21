import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
// import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(@InjectModel('Task') private readonly taskModal: Model<Task>) {}

  getAllTask = async (): Promise<Task[]> => {
    const getTask = await this.taskModal.find().exec();
    return getTask;
  };

  getTasksWithFilters = async (
    filterDto: GetTasksFilterDto,
  ): Promise<Task[]> => {
    const { status, search } = filterDto;

    let tasks = await this.getAllTask();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.desc.includes(search)) {
          return true;
        } else {
          return false;
        }
      });
    }

    return tasks;
  };

  getTasksById = async (id: String): Promise<Task> => {
    return await this.taskModal.findById(id);
  };

  createTask = async (createTaskDto: CreateTaskDto): Promise<Task | string> => {
    const { title, desc } = createTaskDto;
    const tasks = {
      title,
      desc,
      status: TaskStatus.OPEN,
    };
    try {
      const newTask = await new this.taskModal(tasks).save();
      return newTask;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  deleteTask = (id: String): void => {
    this.taskModal.deleteOne({ id }).exec();
  };

  updateTaskStatus = async (id: String, status: TaskStatus): Promise<Task> => {
    const task = await this.getTasksById(id);
    task.status = status;
    return task.save();
  };
}
