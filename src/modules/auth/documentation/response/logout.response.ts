import { ApiProperty } from '@nestjs/swagger';
import { ApiResponse } from '../../../../common/apiResponse';
import { ModelToken, AccessToken } from '../model';

export default class LogoutResponse extends ApiResponse {
  @ApiProperty()
  public data: {
    description: string;
  };
}
