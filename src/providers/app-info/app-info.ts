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

}
