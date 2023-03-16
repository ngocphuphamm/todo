import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { ProvideCustomRepository } from '../../common/utils/customRepository.util';
import { Todo } from './entities';
import TodoRepository from './repository/todo.repository';

const providerRepository = [ProvideCustomRepository(Todo, TodoRepository)];

@Module({
  controllers: [TodosController],
  providers: [TodosService, ...providerRepository],
})
export class TodosModule {}
