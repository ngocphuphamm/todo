import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { TodosService } from './todos.service';
import { TodoDto, PaginationParam } from './dto';
import { HttpUser } from '../../decorators/httpUser';
import { UserPayload } from '../auth/interface/payloads/user.payload';
import JwtAuthGuard from '../../guard/jwt.guard';
import ApiKeyAuthGuard from '../../guard/apiKey.guard';
import CoreApiResponse from '../../common/apiResponse/coreResponse';
import { Todo } from '../todos/entities';
import { TodoListPagination } from './interface/response/TodoListPagination';
import { PAGINATION_PAGE, PAGINATION_SIZE } from '../../constants/pagination';
import { UpdateTodoPayload } from './interface/payload/updateTodo.payload';

@UseGuards(JwtAuthGuard)
@UseGuards(ApiKeyAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async create(
    @HttpUser() user: UserPayload,
    @Body() createTodoDto: TodoDto,
  ): Promise<CoreApiResponse<Todo>> {
    const todo: Todo = await this.todosService.create(createTodoDto, user);
    return CoreApiResponse.success(todo);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getList(
    @HttpUser() user: UserPayload,
    @Query() pagination: PaginationParam,
  ): Promise<CoreApiResponse<TodoListPagination>> {
    const { page = PAGINATION_PAGE, limit = PAGINATION_SIZE } = pagination;

    const listTodoPagination = await this.todosService.findAll(
      { page, limit },
      user,
    );

    return CoreApiResponse.success(listTodoPagination);
  }

  @Get(':todoId')
  @HttpCode(HttpStatus.OK)
  public async detail(
    @HttpUser() user: UserPayload,
    @Param('todoId') todoId: string,
  ): Promise<CoreApiResponse<Todo>> {
    const todo = await this.todosService.findOne(todoId, user);
    return CoreApiResponse.success(todo);
  }

  @Put(':todoId')
  @HttpCode(HttpStatus.OK)
  public async edit(
    @HttpUser() user: UserPayload,
    @Body() body: TodoDto,
    @Param('todoId') todoId: string,
  ): Promise<CoreApiResponse<Todo>> {
    const todoUpdate: UpdateTodoPayload = {
      id: todoId,
      user,
      bodyUpdate: body,
    };
    const todo = await this.todosService.update(todoUpdate);
    return CoreApiResponse.success(todo);
  }

  @Delete(':todoId')
  public async deleteTodoById(
    @Param('todoId') todoId: string,
    @HttpUser() user: UserPayload,
  ): Promise<{ message: string }> {
    await this.todosService.remove(todoId, user);
    return CoreApiResponse.success('Remove Successfull');
  }
}
