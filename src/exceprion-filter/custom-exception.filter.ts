import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { LoggingService } from 'src/logger/logging.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    this.loggingService.logError(error);

    const errResponse = {
      statusCode: status,
      message: error.message,
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
