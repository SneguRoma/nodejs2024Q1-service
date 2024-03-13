import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const opts = new DocumentBuilder()
    .setTitle('Home_Library')
    .setDescription('Home_Library_app')
    .setVersion('1.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, opts);
  SwaggerModule.setup('doc', app, document);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
