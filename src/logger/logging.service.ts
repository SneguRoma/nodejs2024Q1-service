import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const levels = [
  'info',
  'log',
  'error',
  'warn',
  'debug',
  'verbose',
] as LogLevel[];
const logFilePath = process.cwd() + '/logs';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private logLevel: number = parseInt(process.env.MAX_LOG_LEVEL);
  private maxLogFileSize = parseInt(process.env.MAX_LOGFILE_SIZE) || 10485760;
  private currentLogFile: string;
  private currentLogFileStream: fs.WriteStream;

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
      this.writeLog('log:  ' + formattedMessage);
      super.log(formattedMessage);
    }
  }

  error(message: any, stack?: string, context?: string) {
    if (this.isLevelEnabled('error')) {
      this.writeLog('context: ' + context);
      this.writeLog('message: ' + message);
      this.writeLog('Stack: ' + stack);
      super.error('context: ' + context);
      super.error('message: ' + message);
      super.error('Stack: ' + stack);
    }
  }

  warn(message: string) {
    if (this.isLevelEnabled('warn')) {
      this.writeLog('Warn: ' + message);
      super.warn('Warn: ' + message);
    }
  }

  debug(message: string) {
    if (this.isLevelEnabled('debug')) {
      this.writeLog('Debug: ' + message);
      super.debug('Debug:   ' + message);
    }
  }

  verbose(message: string) {
    if (this.isLevelEnabled('verbose')) {
      this.writeLog('verbose: ' + message);
      super.verbose('verbose:  ' + message);
    }
  }

  writeLog(message: string) {
    if (!fs.existsSync(logFilePath)) {
      fs.mkdirSync(logFilePath, { recursive: true });
    }
    this.createLogFileStream();

    if (!this.checkLogFileSize()) {
      this.currentLogFileStream.end();
      this.createLogFileStream();
    }
    this.currentLogFileStream.write(message + '\n');
  }

  checkLogFileSize() {
    if (fs.existsSync(this.currentLogFile)) {
      const stats = fs.statSync(this.currentLogFile);
      return stats.size < this.maxLogFileSize;
    }
    return true;
  }

  createLogFileStream() {
    const currentDate = new Date().toISOString().slice(0, 10);
    const logFileName = `application-${currentDate}.log`;

    this.currentLogFile = path.resolve(logFilePath, logFileName);

    this.currentLogFileStream = fs.createWriteStream(this.currentLogFile, {
      flags: 'a',
    });
  }
}
