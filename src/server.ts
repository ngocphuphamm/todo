import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import helmet from 'helmet';
import 'dotenv/config';

import { RootModule } from './root.module';
import { ApiConfig } from './config';

export class ServerApplication {
  private readonly host: string = ApiConfig.HOST;

  private readonly port: number = Number(ApiConfig.PORT);



  public async run(): Promise<void> {
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(RootModule);

    app.setGlobalPrefix('api/v1'); // Set the global prefix to /api/v1

    // GLOBAL MIDDLEWARES
    app.enableCors();

    app.use(helmet());
    app.use(compression());
    this.log();

    await app.listen(this.port, this.host);
  }

  private log(): void {
    Logger.log(
      `Server started on host: ${this.host}; port: ${this.port};`,
      ServerApplication.name,
    );
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
