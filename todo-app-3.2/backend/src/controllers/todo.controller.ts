import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userTodo } from '../entities/todo.entity';

@Controller('todos')
export class TodoController {
  constructor(
    @InjectRepository(userTodo)
    private readonly todoRepository: Repository<userTodo>,
  ) { }

  @Get()
  async findAllTodos(): Promise<userTodo[]> {
    return this.todoRepository.find();
  }

  @Get(':id')
  async findOneTodos(@Param('id') id: any): Promise<userTodo | null> {
    console.log('Finding task with id:', id);
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      console.log('Task not found with id:', id);
      throw new NotFoundException('Task not found');
    }
    return todo;
  }

  @Post()
  async createTodos(@Body() user: userTodo): Promise<userTodo> {
    return this.todoRepository.save(user);
  }

  @Patch(':id')
  async updateCompleted(
    @Param('id') id: number,
    @Body('completed') completed: boolean,
  ): Promise<userTodo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) throw new NotFoundException('Task not found');
    todo.completed = completed;
    if (completed === true) { todo.completedAt = new Date(); }
    return this.todoRepository.save(todo);
  }

  @Delete(':id')
  async deleteTodos(@Param('id') id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }

}