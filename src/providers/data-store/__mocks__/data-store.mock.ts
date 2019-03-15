export class DataStoreProviderMock {
  setItem = jasmine.createSpy('setItem').and.returnValue('set');
  getItem = jasmine.createSpy('getItem').and.returnValue('get');
  setSecureContainer = jasmine.createSpy('setSecureContainer').and.returnValue(Promise.resolve());
}
