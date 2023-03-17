import { ApiProperty } from '@nestjs/swagger';

export default class AccessToken {
  @ApiProperty({ type: 'string' })
  public accessToken: string;
}
