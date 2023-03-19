import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvironmentService {
  private readonly environment: { [key: string]: any } = {};

  constructor() {
    this.environment = process.env; 
  }

  public get(key: string): any {
    return this.environment[key] || null;
  }
}
