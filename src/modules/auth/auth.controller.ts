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
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiSecurity,
  ApiBody,
} from '@nestjs/swagger';

import { CoreApiResponse, MessageApiResponse } from '../../common/apiResponse';
import { CreateUserDto } from './dtos';
import { RequestWithUser } from './interfaces/requests/requestUser.request';
import { LoggedInUser } from './interfaces/payloads/user.payload';
import { RefreshTokenDto } from './dtos';
import {
  JwtAccessTokenAuthGuard,
  ApiKeyAuthGuard,
  LocalAuthGuard,
} from '../../guard';
import { JwtPayload } from './interfaces/payloads/jwt.payload';
import { API_KEY_HEADER } from '../../common/constants/apiKey';
import {
  RegisterResponse,
  TokenResponse,
  AccessTokenResponse,
} from './documentation/response';
import { LoginBody } from './documentation/request';
import AccessToken from './documentation/model/accessToken.model';
import JwtRefreshTokenGuard from '../../guard/jwtRefreshToken.guard';

@UseGuards(ApiKeyAuthGuard)
@ApiSecurity(API_KEY_HEADER, [API_KEY_HEADER])
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: HttpStatus.OK, type: RegisterResponse })
  public async createAccount(
    @Body() user: CreateUserDto,
  ): Promise<CoreApiResponse<JwtPayload>> {
    const newUser = await this.authService.create(user);
    return CoreApiResponse.success(newUser);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginBody })
  @ApiResponse({ status: HttpStatus.OK, type: TokenResponse })
  public async login(
    @Req() req: RequestWithUser,
  ): Promise<CoreApiResponse<LoggedInUser>> {
    const data: LoggedInUser = await this.authService.login(req.user);

    return CoreApiResponse.success(data);
  }

  @Post('refreshToken')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: RefreshTokenDto })
  @UseGuards(JwtRefreshTokenGuard)
  @ApiResponse({ status: HttpStatus.OK, type: AccessTokenResponse })
  public async refreshToken(
    @Body() body: RefreshTokenDto,
  ): Promise<CoreApiResponse<AccessToken>> {
    const data: string = await this.authService.refreshToken(body.refreshToken);
    return CoreApiResponse.success({
      accessToken: data,
    });
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessTokenAuthGuard)
  @UseGuards(JwtRefreshTokenGuard)
  @ApiBearerAuth()
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: HttpStatus.OK, type: MessageApiResponse })
  public async logout(
    @Body() body: RefreshTokenDto,
  ): Promise<MessageApiResponse> {
    await this.authService.logout(body.refreshToken);
    return CoreApiResponse.success({
      description: 'Logout successfully',
    });
  }
}
