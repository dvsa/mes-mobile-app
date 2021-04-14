var MSAdalMock = /** @class */ (function () {
    function MSAdalMock() {
        this.createAuthenticationContext = jasmine.createSpy('createAuthenticationContext')
            .and
            .returnValue(new AuthenticationContextMock());
    }
    return MSAdalMock;
}());
export { MSAdalMock };
var AuthenticationContextMock = /** @class */ (function () {
    function AuthenticationContextMock() {
        this.tokenCache = new TokenCacheMock();
        this.acquireTokenSilentAsync = jasmine.createSpy('acquireTokenSilentAsync')
            .and
            .returnValue(Promise.resolve({ accessToken: 'U0lMRU5UIEFZU05DIFRFU1QgVE9LRU4' }));
        this.acquireTokenAsync = jasmine.createSpy('acquireTokenAsync')
            .and
            .returnValue(Promise.resolve({ accessToken: 'QVlTTkMgVEVTVCBUT0tFTg==' }));
    }
    return AuthenticationContextMock;
}());
export { AuthenticationContextMock };
var TokenCacheMock = /** @class */ (function () {
    function TokenCacheMock() {
        this.clear = jasmine.createSpy('clear');
    }
    return TokenCacheMock;
}());
export { TokenCacheMock };
//# sourceMappingURL=ms-adal.mock.js.map