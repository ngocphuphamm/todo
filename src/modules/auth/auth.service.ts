import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDto } from './dto';
import { UserRepository } from './auth.repository';
import { User } from './entities/user.entity';
import { CoreAssert } from '../../common/utils/assert';
import { Exception } from '../../common/exception';
import { Code } from '../../common/code';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async create(newUser: UserDto): Promise<string> {
    const doesUserExist = await this.userRepository.countUsers({
      email: newUser.email,
    });
    CoreAssert.isFalse(
      !!doesUserExist,
      Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        overrideMessage: 'User already exists',
      }),
    );

    return await this.userRepository.addUser(newUser);
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
