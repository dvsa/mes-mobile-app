import { Injectable } from '@angular/core';

export abstract class LoneWorkerConfigProvider {
  abstract apiRoot: string;
  abstract amberPollTime: number;
}

@Injectable()
export class LoneWorkerConfigProviderLocal extends LoneWorkerConfigProvider {
  public apiRoot: string;
  public amberPollTime: number;
  constructor() {
    super();

    this.apiRoot = 'http://localhost:3000';
    this.amberPollTime =  30000;
  }
}
