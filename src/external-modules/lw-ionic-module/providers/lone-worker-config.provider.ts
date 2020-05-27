import { Injectable } from '@angular/core';

export abstract class LoneWorkerConfigProvider {
  abstract apiRoot: Function;
  abstract amberPollTime: number;
}

@Injectable()
export class LoneWorkerConfigProviderLocal extends LoneWorkerConfigProvider {
  public apiRoot: Function;
  public amberPollTime: number;
  constructor() {
    super();

    this.apiRoot = () => { return 'http://localhost:3000'; };
    this.amberPollTime =  30000;
  }
}
