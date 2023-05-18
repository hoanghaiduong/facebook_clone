import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true
  });
  app.useBodyParser('json', { limit: '10mb' });
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  //app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('hbs');
  const SERVER = process.env.PORT_SERVER;
  await app.listen(SERVER || 9999);
  // console.log(join(process.cwd(), 'public'));
}
bootstrap();
