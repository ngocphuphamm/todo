import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/modules/auth/entities/user.entity';
export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true,
};
