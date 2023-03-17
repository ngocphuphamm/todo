import { ApiProperty } from '@nestjs/swagger';

export default class ModelToken {
  @ApiProperty({ type: 'string' })
  public id: string;

  @ApiProperty({ type: 'string' })
  public accessToken: string;

  @ApiProperty({ type: 'string' })
  public refreshToken: string;
}
