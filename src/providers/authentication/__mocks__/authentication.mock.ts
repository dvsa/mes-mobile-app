export class AuthenticationProviderMock {

  isAuthenticated = (): boolean => {
    return true;
  };

  getAuthenticationToken = (): string => {
    return 'token';
  };

  getEmployeeId = (): string => {
    return '12345678';
  };

  login = () => {
    return new Promise(() => {});
  }

  loginWithCredentials = () => {
    return new Promise(() => {});
  }

  logout = () => {
    return new Promise(() => { });
  };
}

