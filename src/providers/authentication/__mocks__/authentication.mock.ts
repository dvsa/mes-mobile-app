export class AuthenticationProviderMock {

  isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(true);

  isInUnAuthenticatedMode = jasmine.createSpy('isInUnAuthenticatedMode').and.returnValue(false);
  getUnAuthenticatedMode = jasmine.createSpy('getUnAuthenticatedMode').and.returnValue(false);

  getAuthenticationToken = jasmine.createSpy('getAuthenticationToken').and.returnValue(Promise.resolve('token'));

  getEmployeeId = jasmine.createSpy('getEmployeeId').and.returnValue('12345678');

  login = jasmine.createSpy('login').and.returnValue(Promise.resolve());

  logout = jasmine.createSpy('logout').and.returnValue(Promise.resolve());

  initialiseAuthentication = jasmine.createSpy('initialiseAuthentication');
  determineAuthenticationMode = jasmine.createSpy('determineAuthenticationMode');
}
