import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User, ApiKey } from '../modules/auth/entities';
import { Todo } from '../modules/todos/entities';
Todo;
const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, ApiKey, Todo],
  synchronize: true,
};
export default TypeOrmConfig;
