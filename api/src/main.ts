import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { strategy: 'excludeAll' } }));
  await app.listen(process.env.PORT || 3000);
  console.log('API listening @ http://localhost:3000/');
}
bootstrap();