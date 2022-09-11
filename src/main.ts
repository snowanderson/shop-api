import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as pjson from '../package.json';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(pjson.name)
    .setDescription(pjson.description)
    .setVersion(pjson.version)
    .addBearerAuth(
      {
        description:
          'Please enter your token ("Bearer" word is already automatically added)',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  // Removing "Controller" word from the operation id in Swagger
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey.replace('Controller', '')}_${methodKey}`,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
    }),
  );

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
  Logger.log('Access Swagger documentation at http://localhost:3000');
}
bootstrap();
