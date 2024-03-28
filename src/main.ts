import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingService } from './logger/logging.service';
import { CustomExceptionFilter } from './exceprion-filter/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);
  app.useLogger(loggingService);
  app.useGlobalFilters(new CustomExceptionFilter(loggingService));

  process.on('uncaughtException', (error) => {
    loggingService.logError(error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggingService.logError(
      new Error(`Unhandled Rejection at: ${promise}. Reason: ${reason}`),
    );
  });
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
