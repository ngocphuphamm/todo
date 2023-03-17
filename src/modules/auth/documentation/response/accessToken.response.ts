import { ApiProperty } from '@nestjs/swagger';
import { ApiResponse } from '../../../../common/apiResponse';
import { ModelToken, AccessToken } from '../model';

export default class AccessTokenResponse extends ApiResponse {
  @ApiProperty({ type: AccessToken })
  public data: AccessToken;
}
