import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.use('/admin/css',express.static(path.join(__dirname, 'admin/public/css')));
  // app.use('/admin/js', express.static(path.join(__dirname, 'admin/public/js')));
  app.use(cookieParser());
  app.use(
    '/payments/webhook',
    express.raw({ type: 'application/json' }),
  );

  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('ejs');

  app.useStaticAssets(join(__dirname, '..', 'public/public'));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();