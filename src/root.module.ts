import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure.module';
import { ServiceModule } from './modules/service.module';
@Module({
  imports: [InfrastructureModule, ServiceModule],
})
export class RootModule {}
