import {
  Controller,
  HttpCode,
  Get,
  Post,
  HttpStatus,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { CoreApiResponse } from 'src/common/apiResponse';
import { UserDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async createAccount(
    @Body(ValidationPipe) user: UserDto,
  ): Promise<CoreApiResponse<string>> {
    const newUserId = await this.authService.create(user);
    return CoreApiResponse.success(newUserId);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
