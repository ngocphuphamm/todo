import { ApiProperty } from '@nestjs/swagger';
import ApiResponse from '../../../../common/apiResponse/modelApiResponse';
import TodoModel from '../../documentation/model/todo.model';

export default class Todo extends ApiResponse {
  @ApiProperty({ type: TodoModel })
  data: TodoModel;
}
