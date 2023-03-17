import { AuthGuard } from '@nestjs/passport';

export default class JwtAccessTokenAuthGuard extends AuthGuard('jwt') {}
