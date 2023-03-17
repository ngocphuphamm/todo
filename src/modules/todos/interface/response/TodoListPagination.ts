import { PaginationParam } from '../../dto';
import { Todo } from '../../entities';
export interface TodoListPagination {
  pagination: PaginationParam;

  listTodo: Todo[];
}
