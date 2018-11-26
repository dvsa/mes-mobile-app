import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigProvider {
  // Environment variables
  public journalApiUrl: string;

  // Client variables
  signaturePadOptions: any = {
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300,
    throttle: 0,
    backgroundColor: '#ffffff'
  };

  googleAnalyticsId: string = 'UA-129814222-1';

  constructor() {
    this.journalApiUrl = 'assets/data/journalResp.json';
  }

  getJournalApiUrl(): string {
    return this.journalApiUrl;
  }

  getSignaturePadOptions() {
    return this.signaturePadOptions;
  }

  getGoogleAnalyticsKey() {
    return this.googleAnalyticsId;
  }
}
