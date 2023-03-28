import TodoDto from '../../todos/dto/todo.dto';
import { TodoPriority, TodoStatus } from '../../../enums/todo.enum';
const todoData: TodoDto = {
  title: 'moinhat1555555',
  description: '112312323',
  startTime: new Date('2023-03-20T10:00:00.000Z'),
  endTime: new Date('2023-03-20T11:30:00.000Z'),
  status: TodoStatus.TODO,
  priority: TodoPriority.LOW,
};

export { todoData };
