import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { v4 } from 'uuid';

import { UserDto } from './dto';
import { User } from './entities/user.entity';
import { RepositoryFindOptions } from 'src/common/repositoryOptions';
import { Optional } from 'src/common/types';
export class UserRepository extends Repository<User> {
  private readonly userAlias: string = 'user';

  public async addUser(newUser: any): Promise<string> {
    const user = new User();
    user.id = v4();
    user.username = newUser.username;
    user.email = newUser.email;
    user.password = await this.hashPassword(newUser.password);
    user.createdAt = new Date();
    user.updatedAt = new Date();

    await user.save();

    return user.id;
  }
  public async countUsers(
    by: { id?: string; email?: string },
    options: RepositoryFindOptions = {},
  ): Promise<number> {
    const query: SelectQueryBuilder<User> = this.buildUserQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    return query.getCount();
  }

  public async findUser(
    by: { id?: string; email?: string },
    options: RepositoryFindOptions = {},
  ): Promise<Optional<User>> {
    const query: SelectQueryBuilder<User> = this.buildUserQueryBuilder();
    this.extendQueryWithByProperties(by, query);
    const user: Optional<User | null> = await query.getOne();
    console.log(user);
    return user;
  }

  private buildUserQueryBuilder(): SelectQueryBuilder<User> {
    return this.createQueryBuilder(this.userAlias).select();
  }

  private async hashPassword(password: string): Promise<string> {
    const salt: string = await genSalt();
    return hash(password, salt);
  }
  private extendQueryWithByProperties(
    by: { id?: string; email?: string },
    query: SelectQueryBuilder<User>,
  ): void {
    switch (true) {
      case Boolean(by.id):
        query.andWhere(`${this.userAlias}.id = :id`, { id: by.id });
        break;
      case Boolean(by.email):
        query.andWhere(`${this.userAlias}.email = :email`, {
          email: by.email,
        });
        break;
      default:
        // Handle the case where neither ID nor email is provided.
        throw new Error(
          'Please provide either an ID or an email to search for a user.',
        );
    }
  }
}
