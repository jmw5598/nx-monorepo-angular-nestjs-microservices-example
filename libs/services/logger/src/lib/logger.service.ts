import { ConsoleLogger, Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  private readonly _environment: string;

  constructor() {
    super();
    this._environment = process.env.NODE_environment || 'dev';
  }

  public error(message: string, trace: string): void {
    super.error(message, trace);
    if (this._environment === 'prod') {
      // TODO - Persist error to database
    }
  }
  public warn(message: string): void {
    super.warn(message);
    if (this._environment === 'prod') {
      // TODO - Persist warn to database
    }
  }
  public debug(message: string): void {
    super.debug(message);
    if (this._environment === 'prod') {
      // TODO - Persist debug to database
    }
  }
  public verbose(message: string): void {
    super.debug(message);
    if (this._environment === 'prod') {
      // TODO - Persist verbose to database
    }
  }
}
