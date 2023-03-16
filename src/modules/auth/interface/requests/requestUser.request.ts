import { Request } from 'express';

import { UserPayload } from '../payloads/user.payload';
export interface RequestWithUser extends Request {
  user: UserPayload;
}
