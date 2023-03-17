import { ApiProperty } from '@nestjs/swagger';
import { TodoDto } from '../../dto';

export default class TodoModel extends TodoDto {
  @ApiProperty({ type: 'string', format: 'date-time', required: true })
  public readonly createdAt: Date;
  @ApiProperty({ type: 'string', format: 'date-time', required: true })
  public readonly updatedAt: Date;
}
