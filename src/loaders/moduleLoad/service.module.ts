import { Module } from '@nestjs/common';
import { AuthModule } from '../../modules/auth/auth.module';
import { TodosModule } from '../../modules/todos/todos.module';
@Module({
  imports: [AuthModule, TodosModule],
})
export class ServiceModule {}
