import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from 'src/logger/logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const now = Date.now();
    const { url, body, query } = request;

    return next.handle().pipe(
      tap((responseData) => {
        this.loggingService.logIncomingRequest(
          url,
          query,
          body,
          `Statuscode:  ${response.statusCode}  Responce: ${JSON.stringify(
            responseData,
          )}`,
          `Time: ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
