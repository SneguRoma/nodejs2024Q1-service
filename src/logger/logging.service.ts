import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';

const levels = [
  'info',
  'log',
  'error',
  'warn',
  'debug',
  'verbose',
] as LogLevel[];

@Injectable()
export class LoggingService extends ConsoleLogger { 
  private logLevel: number = parseInt(process.env.MAX_LOG_LEVEL);
  private maxLogFileSize = process.env.MAX_LOGFILE_SIZE || 10485760;

  constructor() {
    super();
    this.setLogLevels(levels.slice(0, this.logLevel));
  }

  logIncomingRequest(
    url: string,
    queryParams: any,
    body: any,
    responseData: string,
    time: string,
  ) {
    this.log(
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
    this.log(`Response sent with status code: ${statusCode}`);
  }
}
