import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TodoDto, PaginationParam } from './dto';
import { UserPayload } from '../auth/interface/payloads/user.payload';
import TodoRepository from './repository/todo.repository';
import { Todo } from './entities';
import { PAGINATION_PAGE, PAGINATION_SIZE } from '../../constants/pagination';
import { TodoListPagination } from './interface/response/TodoListPagination';
import { CoreAssert } from '../../common/utils/assert';
import { Exception } from '../../common/exception';
import { Code } from '../../common/code';
import { UpdateTodoPayload } from './interface/payload/updateTodo.payload';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: TodoRepository,
  ) {}

  public async create(newTodo: TodoDto, user: UserPayload): Promise<Todo> {
    return this.todoRepository.addToDo(newTodo, user);
  }

  public async findAll(
    { page = PAGINATION_PAGE, limit = PAGINATION_SIZE }: PaginationParam,
    user: UserPayload,
  ): Promise<TodoListPagination> {
    const todos: Todo[] = await this.todoRepository.findToDos(
      {
        userId: user.id,
      },
      {
        limit,
        page,
      },
    );
    const sumToDo: number = await this.todoRepository.countToDos({
      userId: user.id,
    });

    const sum = Math.ceil(sumToDo / limit);
    return {
      pagination: {
        page: page,
        limit: limit,
        sumPage: sum > 0 ? sum : 1,
      },
      listToDo: todos,
    };
  }

  public async findOne(id: string, user: UserPayload): Promise<Todo> {
    const todo: Todo = CoreAssert.notEmpty(
      await this.todoRepository.findOne({
        where: { id, userId: user.id },
      }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'To Do not found.',
      }),
    );
    return todo;
  }

  public async update(updateBodyTodo: UpdateTodoPayload): Promise<Todo> {
    return this.todoRepository.updateTodo(updateBodyTodo);
  }

  public async remove(id: string, user: UserPayload): Promise<void> {
    const toDo: Todo = CoreAssert.notEmpty(
      await this.findOne(id, user),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'To Do not found.',
      }),
    );
    const hasAccess: boolean = user.id === toDo.userId;
    CoreAssert.isTrue(
      hasAccess,
      Exception.new({ code: Code.ACCESS_DENIED_ERROR }),
    );

    await this.todoRepository.delete(id);
  }
}
