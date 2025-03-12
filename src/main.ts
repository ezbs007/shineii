import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Configure cookie parser
  app.use(cookieParser());
  
  // Configure raw body parsing for Stripe webhooks
  app.use(
    '/payments/webhook',
    express.raw({ type: 'application/json' }),
  );
  
  // Configure view engine with the correct path
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  
  // Serve static files
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();