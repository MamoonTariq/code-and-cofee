import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      const alltask = this.tasksService.getTasksWithFilters(filterDto);
      return alltask;
    } else {
      const allTasks = await this.tasksService.getAllTask();
      return allTasks;
    }
  }

  @Get('/:id')
  async getTasksById(@Param('id') id: String): Promise<Task> {
    return await this.tasksService.getTasksById(id);
  }

  @Post()
  async createTasks(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task | string> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: String): void {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: String,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    return await this.tasksService.updateTaskStatus(id, status);
  }
}
