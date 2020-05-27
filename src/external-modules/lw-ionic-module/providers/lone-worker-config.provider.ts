import { Injectable } from '@angular/core';
export interface LocationUpdateConfig {
  pollFrequencySeconds?: number;
  timeoutMinutes?: number;
}

export abstract class LoneWorkerConfigProvider {
  abstract apiRoot: Function;
  abstract amberPollTime: number;
  abstract redLocationUpdate?: LocationUpdateConfig;
  abstract amberLocationUpdate?: LocationUpdateConfig;
}

@Injectable()
export class LoneWorkerConfigProviderLocal extends LoneWorkerConfigProvider {
  public apiRoot: Function;
  public amberPollTime: number;
  public redLocationUpdate?: LocationUpdateConfig;
  public amberLocationUpdate?: LocationUpdateConfig;

  constructor() {
    super();

    this.apiRoot = () => { return 'http://localhost:3000'; };
    this.amberPollTime =  30000;
  }
}
