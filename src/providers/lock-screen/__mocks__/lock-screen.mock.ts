import { Injectable } from '@angular/core';

@Injectable()
export class LockScreenProviderMock {

  constructor() { }

  triggerLockScreen = jasmine.createSpy('triggerLockScreen').and.returnValue(Promise.resolve(true));
}
