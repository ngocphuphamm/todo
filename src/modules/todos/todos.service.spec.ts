import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities';
import { randomUUID } from 'crypto';
import { todoData } from './dumpData/todo';
import { userData } from '../../common/data/user';
describe('TodosService', () => {
  let service: TodosService;

  const mockTodosRepository = {
    addToDo: jest.fn().mockImplementation((todo, user) => {
      const res = {
        id: randomUUID(),
        ...todo,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return res;
    }),
    save: jest
      .fn()
      .mockImplementation((todo) =>
        Promise.resolve({ id: randomUUID(), ...Todo }),
      ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodosRepository,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new todo', async () => {
    const createService = await service.create(todoData, userData);
    expect(createService).toEqual({
      id: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      ...todoData,
    });
  });
});
