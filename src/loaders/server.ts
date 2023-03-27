import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import helmet from 'helmet';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { RootModule } from './moduleLoad/root.module';
import { ApiConfig } from '../config';
import { API_KEY_HEADER } from 'src/common/constants/apiKey';

export class ServerApplication {
  private readonly host: string = ApiConfig.HOST;

  private readonly port: number = Number(ApiConfig.PORT);

  public async run(): Promise<void> {
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(RootModule);

    app.setGlobalPrefix('api/v1'); // Set the global prefix to /api/v1
    app.useGlobalPipes(new ValidationPipe());

    // GLOBAL MIDDLEWARES
    app.enableCors();

    app.enable('trust proxy');
    app.use(helmet());
    app.use(compression());
    this.log();
    this.buildAPIDocumentation(app);

    await app.listen(this.port);
  }

  private buildAPIDocumentation(app: NestExpressApplication): void {
    const title = 'To Do List';
    const description = 'To Do List API documentation';
    const version = '1.0.0';

    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addApiKey(
        {
          type: 'apiKey',
          name: API_KEY_HEADER,
          in: 'header',
          description: 'Enter your API key',
        },
        API_KEY_HEADER,
      )
      .addBearerAuth()
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('documentation', app, document);
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
