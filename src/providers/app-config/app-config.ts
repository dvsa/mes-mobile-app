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

  // todo - needs to be commented in for deployment for familiarisation
  // googleAnalyticsId: string = 'UA-129489007-1'; // Key for beta
  googleAnalyticsId: string = 'UA-129814222-1'; // Brians test key for development until we deploy for familiarisation
  userIdDimensionIndex: number = 1; // This is the userId dimension index

  constructor() {
    this.journalApiUrl = 'assets/data/journalResp.json';
  }

  getJournalApiUrl(): string {
    return this.journalApiUrl;
  }

  getSignaturePadOptions() {
    return this.signaturePadOptions;
  }

  getGoogleAnalyticsKey(): string {
    return this.googleAnalyticsId;
  }

  getGoogleAnalyticsUserIdDimension(): number {
    return this.userIdDimensionIndex;
  }
}
