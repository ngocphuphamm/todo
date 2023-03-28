import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

import { randomUUID } from 'crypto';
import { UpdateTodoPayload } from '../todos/interface/payload/updateTodo.payload';
import { todoData as todo } from './dumpData/todo';
import { userData as user } from '../../common/data/user';
describe('TodosController', () => {
  let controller: TodosController;

  const mockTodosService = {
    create: jest.fn((dto) => {
      return {
        id: randomUUID(),
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((dto: UpdateTodoPayload) => {
      return {
        id: dto.id,
        ...dto.bodyUpdate,
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService],
    })
      .overrideProvider(TodosService)
      .useValue(mockTodosService)
      .compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new todo', async () => {
    const create = await controller.create(user, todo);
    expect(create).toEqual({
      code: 200,
      message: 'Success.',
      data: {
        id: expect.any(String),
        title: 'moinhat1555555',
        description: '112312323',
        startTime: new Date('2023-03-20T10:00:00.000Z'),
        endTime: new Date('2023-03-20T11:30:00.000Z'),
        priority: 'low',
        status: 'to do',
      },
      timestamp: expect.any(Number),
    });
    expect(mockTodosService.create).toHaveBeenCalledWith(todo, user);
  });

  it('should update todos', async () => {
    const bodyPayload: UpdateTodoPayload = {
      id: randomUUID(),
      bodyUpdate: todo,
      user,
    };

    const fncEdit = await controller.edit(
      bodyPayload.user,
      bodyPayload.bodyUpdate,
      bodyPayload.id,
    );

    expect(fncEdit).toEqual({
      code: 200,
      message: 'Success.',
      data: {
        id: bodyPayload.id,
        ...todo,
      },
      timestamp: expect.any(Number),
    });

    expect(mockTodosService.update).toHaveBeenCalledWith(bodyPayload);
  });
});
