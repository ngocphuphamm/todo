import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { CoreApiResponse } from '../../common/apiResponse';
import { CreateUserDto } from './dto';
import { JwtPayload } from './interface/payloads/jwt.payload';
import { RequestWithUser } from './interface/requests/requestUser.request';
import { LoggedInUser } from './interface/payloads/user.payload';
import { ResponseLogout } from './interface/responses/reponseLogout.response';
import { RefreshTokenDto } from './dto';
import { JwtAuthGuard, ApiKeyAuthGuard, LocalAuthGuard } from '../../guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async createAccount(
    @Body() user: CreateUserDto,
  ): Promise<CoreApiResponse<JwtPayload>> {
    const newUser = await this.authService.create(user);
    return CoreApiResponse.success(newUser);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  public async login(
    @Req() req: RequestWithUser,
  ): Promise<CoreApiResponse<LoggedInUser>> {
    const data: LoggedInUser = await this.authService.login(req.user);

    return CoreApiResponse.success(data);
  }

  @Post('refreshToken')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(
    @Body() body: RefreshTokenDto,
  ): Promise<CoreApiResponse<string>> {
    const data: string = await this.authService.refreshToken(body.refreshToken);
    return CoreApiResponse.success(data);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async logout(
    @Body() body: RefreshTokenDto,
  ): Promise<CoreApiResponse<ResponseLogout>> {
    await this.authService.logout(body.refreshToken);
    return CoreApiResponse.success({
      description: 'Logout successfully',
    });
  }
}
