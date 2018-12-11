export class MSAdalMock {

  createAuthenticationContext(context: string) {
    return new AuthenticationContextMock;
  }
}

export class AuthenticationContextMock {

  tokenCache = new TokenCacheMock();

  acquireTokenSilentAsync(resourceUrl: string, clientId: string, emptyString: string) {
    return new Promise((resolve, reject) => {
      resolve({
        accessToken: 'SILENT AYSNC TEST TOKEN'
      });
    })
  }

  // jest.fn().mockRejectedValue(new Error('Aysnc error'))

  acquireTokenAsync(
    resourceUrl: string,
    clientId: string,
    redirectUrl: string,
    emptyString1: string,
    emptyString2: string
  ) {
    return {
      accessToken: 'AYSNC TEST TOKEN'
    }
  }
}

export class TokenCacheMock {

  clear() {

  }
}
