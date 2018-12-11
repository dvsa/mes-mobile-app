export class AuthenticationServiceProviderMock {

  isAuthenticated() : boolean {
    return true;
  }

  getAuthenticationToken() : string {
    return 'token';
  }

  login(): void { }

  logout(): void { }

}
