import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: {
    origin: true,
    credentials: true}});
  app.use(cookieParser());
  app.setGlobalPrefix('api');
 // app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
