// logging.service.ts
import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private logger = new Logger('Application');

  logIncomingRequest(
    url: string,
    queryParams: any,
    body: any,
    responseData: string,
    time: string,
  ) {
    this.logger.log(
      `Incoming request: URL - ${url}, QueryParams - ${JSON.stringify(
        queryParams,
      )}, Body - ${JSON.stringify(body)} ${responseData} ${time}`,
    );
  }

  log(message: string) {
    if (this.isLevelEnabled('log')) {
      const formattedMessage = message.toLocaleUpperCase();
      super.log(formattedMessage);
    }
  }

  error(message: any, stack?: string, context?: string) {
    if (this.isLevelEnabled('error')) {
      super.error('context: ' + context);
      super.error('message: ' + message);
      super.error('Stack: ' + stack);
    }
  }

  warn(message: string) {
    if (this.isLevelEnabled('warn')) {
      super.warn('Warn: ' + message);
    }
  }

  debug(message: string) {
    if (this.isLevelEnabled('debug')) {
      super.debug('Debug:   ' + message);
    }
  }

  verbose(message: string) {
    if (this.isLevelEnabled('verbose')) {
      super.verbose('verbose:  ' + message);
    }
  }

  logResponse(statusCode: number) {
    console.log('here is 2');
    this.logger.log(`Response sent with status code: ${statusCode}`);
  }

  logError(error: Error) {
    console.log('here is 3');
    //this.logger.error(error.message, stack, context);
  }
}
