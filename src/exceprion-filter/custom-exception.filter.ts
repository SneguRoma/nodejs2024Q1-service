import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { LoggingService } from 'src/logger/logging.service';
import { Request, Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    this.loggingService.error(exception);

    const errResponse = {
      statusCode: status,
      message: exception.message,
      date: new Date().toLocaleDateString(),
      method: request.method,
      path: request.url,
    };

    this.loggingService.error(
      `Method: ${request.method} Query: ${request.url}`,
      JSON.stringify(errResponse),
      `ExceptionFilter`,
    );

    response.status(status).json(errResponse);
  }
}
