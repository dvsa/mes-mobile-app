import { Injectable } from '@angular/core';

@Injectable()
export class LocationProvider {

    // public navigator property to support mocking/testing
  public navigator: Navigator = window.navigator;

  tryGetCurrentLocation(tryCount = 5): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      this.getCurrentLocation(resolve, reject, tryCount);
    });
  }

  private getCurrentLocation(
      resolve: (value?: Coordinates | PromiseLike<Coordinates>) => void,
      reject: (reason?: any) => void,
      tryCount = 5,
      tryCountInternal = 0): void {

    const tc = tryCountInternal + 1;

    this.navigator.geolocation.getCurrentPosition(
        (req) => {
          resolve(req.coords);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            reject({ permissionDenied: true });
          } else if (tryCount === tc) {
            reject({ maxRetryReached: true, errorCode: err.code, message: err.message });
          } else {
            this.getCurrentLocation(resolve, reject, tryCount, tc);
          }
        });
  }
}
