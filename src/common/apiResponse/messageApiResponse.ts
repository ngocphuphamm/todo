import ApiResponse from './modelApiResponse';
import { ApiProperty } from '@nestjs/swagger';

class Description {
  @ApiProperty({ type: 'string' })
  description: string;
}

export default class MessageApiResponse extends ApiResponse {
  @ApiProperty({ type: Description })
  public data: Description;
}
