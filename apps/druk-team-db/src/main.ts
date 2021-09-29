
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = '';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 5000;
  await app.listen(port);
}

bootstrap();
