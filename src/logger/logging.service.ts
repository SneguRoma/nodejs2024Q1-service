// logging.service.ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
  private logger = new Logger('Application');

  logIncomingRequest(url: string, queryParams: any, body: any) {
    this.logger.log(
      `Incoming request: URL - ${url}, QueryParams - ${JSON.stringify(
        queryParams,
      )}, Body - ${JSON.stringify(body)}`,
    );
  }

  logResponse(statusCode: number) {
    this.logger.log(`Response sent with status code: ${statusCode}`);
  }

  logError(error: Error) {
    this.logger.error(error.message, error.stack);
  }
}
