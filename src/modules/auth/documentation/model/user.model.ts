import { ApiProperty } from '@nestjs/swagger';

import { JwtPayload } from '../../interfaces/payloads/jwt.payload';

export default class ModelUser implements JwtPayload {
  @ApiProperty({ type: 'string' })
  id: string;
  @ApiProperty({ type: 'string' })
  email: string;
  @ApiProperty({ type: 'string' })
  username: string;
}
