import { Injectable } from '@angular/core';

@Injectable()
export class DeviceAuthenticationProviderMock {

  constructor() { }

  triggerLockScreen = jasmine.createSpy('triggerLockScreen').and.returnValue(Promise.resolve(true));
}
