import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './controllers/todo.controller';
import { userTodo } from './entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres-db',
      password: 'burgerpizza',
      database: 'todo-crud',
      entities: [userTodo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([userTodo]),
  ],
  controllers: [TodoController],
})
export class AppModule {}