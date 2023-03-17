import { ApiProperty } from '@nestjs/swagger';

import { ApiResponse } from '../../../../common/apiResponse';
import { ModelUser } from '../model';

export default class RegisterResponse extends ApiResponse {
  @ApiProperty({ type: ModelUser })
  public data: ModelUser;
}
