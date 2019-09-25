import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppInfoProvider {

  constructor(private appVersion: AppVersion) { }

  public getVersionNumber(): Observable<string> {
    return fromPromise(this.appVersion.getVersionNumber());
  }

  public async getMajorAndMinorVersionNumber (): Promise<string> {
    const versionNumber =  await this.appVersion.getVersionNumber();
    const majorVersion = versionNumber.split('.')[0];
    const minorVersion = versionNumber.split('.')[1];
    return `${majorVersion}.${minorVersion}`;
  }

}
