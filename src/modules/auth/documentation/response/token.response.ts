import { ApiProperty } from '@nestjs/swagger';
import { ApiResponse } from '../../../../common/apiResponse';
import { ModelToken } from '../model';

export default class TokenResponse extends ApiResponse {
  @ApiProperty({ type: ModelToken })
  public data: ModelToken;
}
