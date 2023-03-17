import { ApiProperty } from '@nestjs/swagger';
import { TodoModel, PaginationModel } from '../model';

export default class ListTodoPaginationModel {
  @ApiProperty({ type: PaginationModel })
  public pagination: PaginationModel;

  @ApiProperty({ type: TodoModel })
  public listTodo: TodoModel[];
}
