import { UserPayload } from '../../../auth/interface/payloads/user.payload';
import { TodoDto } from '../../dto';
export interface UpdateTodoPayload {
  id: string;
  user: UserPayload;
  bodyUpdate: TodoDto;
}
