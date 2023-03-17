import { v4 } from 'uuid';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { Todo } from '../entities';
import { RepositoryFindOptions } from '../../../common/repositoryOptions';
import User from '../../auth/entities/user.entity';
import { TodoStatus, TodoPriority } from '../../../enums/todo.enum';
import { Pagination } from '../../../common/types';
import helper from '../../../common/utils/helper';
import { UserPayload } from '../../auth/interfaces/payloads/user.payload';
import { TodoDto } from '../dto';
import { UpdateTodoPayload } from '../interface/payload/updateTodo.payload';

export default class TodoRepository extends Repository<Todo> {
  private readonly toDoAlias: string = 'todos';

  public async addToDo(newTodo: TodoDto, user: UserPayload): Promise<Todo> {
    const todo: Todo = new Todo();
    todo.id = v4();
    todo.title = newTodo.title;
    todo.description = newTodo.description;
    todo.startTime = newTodo.startTime;
    todo.endTime = newTodo.endTime;
    todo.priority = newTodo.priority;
    todo.status = newTodo.status;
    todo.userId = user.id;
    todo.createdAt = new Date();
    todo.updatedAt = new Date();
    await todo.save();

    return todo;
  }

  public async findToDos(
    by: { userId?: string },
    options: RepositoryFindOptions = {},
  ): Promise<Todo[]> {
    const query: SelectQueryBuilder<Todo> = this.buildToDoQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    const { skip, take }: Pagination = await helper.getInfoPagination(options);

    query.skip(skip).take(take);

    const todos: Todo[] = await query.getMany();

    return todos;
  }

  public async countToDos(
    by: { userId?: string },
    options: RepositoryFindOptions = {},
  ): Promise<number> {
    const query: SelectQueryBuilder<Todo> = this.buildToDoQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    return query.getCount();
  }

  public async findToDo(
    by: { id: string; userId?: string },
    options: RepositoryFindOptions = {},
  ): Promise<number> {
    const query: SelectQueryBuilder<Todo> = this.buildToDoQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    return query.getCount();
  }

  public async updateTodo({
    id,
    bodyUpdate,
    user,
  }: UpdateTodoPayload): Promise<Todo> {
    const todo: Todo = await this.findOne({
      where: { id, userId: user.id },
    });
    todo.title = bodyUpdate.title;
    todo.startTime = bodyUpdate.startTime;
    todo.endTime = bodyUpdate.endTime;
    todo.priority = bodyUpdate.priority;
    todo.status = bodyUpdate.status;
    todo.description = bodyUpdate.description;
    todo.updatedAt = new Date();
    await todo.save();
    return todo;
  }

  private buildToDoQueryBuilder(): SelectQueryBuilder<Todo> {
    return this.createQueryBuilder(this.toDoAlias)
      .select()
      .orderBy(`${this.toDoAlias}.createdAt`, 'DESC');
  }

  private extendQueryWithByProperties(
    by: {
      id?: string;
      userId?: string;
      status?: TodoStatus;
      priority?: TodoPriority;
    },
    query: SelectQueryBuilder<Todo>,
  ): void {
    switch (true) {
      case Boolean(by.id):
        query.andWhere(`${this.toDoAlias}.id = :id`, { id: by.id });
        break;
      case Boolean(by.userId):
        query.andWhere(`${this.toDoAlias}.userId = :userId`, {
          userId: by.userId,
        });
        break;
      case Boolean(by.priority):
        query.andWhere(`${this.toDoAlias}.priority = :priority`, {
          priority: by.priority,
        });
        break;
      default:
        break;
    }
  }
}
