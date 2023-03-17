import PaginationParam from '../../dto/paginationParam.dto';
import { ApiProperty } from '@nestjs/swagger';

export default class PaginationModel extends PaginationParam {
  @ApiProperty({
    description: 'The maximum number of items to retrieve',
    minimum: 1,
    type: Number,
  })
  public sumPage: number;
}
