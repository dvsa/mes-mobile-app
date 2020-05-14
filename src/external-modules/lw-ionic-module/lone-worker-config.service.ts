import { InjectionToken } from '@angular/core';

export interface LoneWorkerConfig {
  apiRoot: string;
  amberPollTime?: number;
}

export const loneWorkerConfigService = new InjectionToken<LoneWorkerConfig>('LoneWorkerConfig');
