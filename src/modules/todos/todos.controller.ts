import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiSecurity,
  ApiBody,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

import { TodosService } from './todos.service';
import { TodoDto, PaginationParam } from './dto';
import { HttpUser } from '../../decorators/httpUser';
import { UserPayload } from '../auth/interfaces/payloads/user.payload';
import JwtAccessTokenAuthGuard from '../../guard/jwtAccessToken.guard';
import ApiKeyAuthGuard from '../../guard/apiKey.guard';
import CoreApiResponse from '../../common/apiResponse/coreResponse';
import { Todo } from '../todos/entities';
import { TodoListPagination } from './interface/response/TodoListPagination';
import {
  PAGINATION_PAGE,
  PAGINATION_SIZE,
} from '../../common/constants/pagination';
import { API_KEY_HEADER } from 'src/common/constants/apiKey';
import { UpdateTodoPayload } from './interface/payload/updateTodo.payload';
import MessageApiResponse from '../../common/apiResponse/messageApiResponse';
import {
  TodoResponse,
  ListTodoPaginationResponse,
} from './documentation/response';

@UseGuards(JwtAccessTokenAuthGuard)
@UseGuards(ApiKeyAuthGuard)
@Controller('todos')
@ApiTags('Todos')
@ApiBearerAuth()
@ApiSecurity(API_KEY_HEADER, [API_KEY_HEADER])
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: TodoResponse })
  public async create(
    @HttpUser() user: UserPayload,
    @Body() createTodoDto: TodoDto,
  ): Promise<CoreApiResponse<Todo>> {
    const todo: Todo = await this.todosService.create(createTodoDto, user);
    return CoreApiResponse.success(todo);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ListTodoPaginationResponse })
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
  @ApiResponse({ status: HttpStatus.OK, type: TodoResponse })
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
  @ApiResponse({ status: HttpStatus.OK, type: MessageApiResponse })
  public async deleteTodoById(
    @Param('todoId') todoId: string,
    @HttpUser() user: UserPayload,
  ): Promise<MessageApiResponse> {
    await this.todosService.remove(todoId, user);
    return CoreApiResponse.success({
      description: 'Remove Successfull',
    });
  }
}
