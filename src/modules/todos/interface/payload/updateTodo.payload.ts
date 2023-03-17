import { UserPayload } from '../../../auth/interfaces/payloads/user.payload';
import { TodoDto } from '../../dto';
export interface UpdateTodoPayload {
  id: string;
  user: UserPayload;
  bodyUpdate: TodoDto;
}
