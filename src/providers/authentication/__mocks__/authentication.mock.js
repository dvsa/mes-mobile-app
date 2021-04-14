var AuthenticationProviderMock = /** @class */ (function () {
    function AuthenticationProviderMock() {
        this.isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(Promise.resolve(true));
        this.isInUnAuthenticatedMode = jasmine.createSpy('isInUnAuthenticatedMode').and.returnValue(false);
        this.getAuthenticationToken = jasmine.createSpy('getAuthenticationToken').and.returnValue(Promise.resolve('token'));
        this.getEmployeeId = jasmine.createSpy('getEmployeeId').and.returnValue('12345678');
        this.getEmployeeName = jasmine.createSpy('getEmployeeName').and.returnValue('Graham O\'Brien');
        this.isDelegatedExaminer = jasmine.createSpy('isDelegatedExaminer');
        this.login = jasmine.createSpy('login').and.returnValue(Promise.resolve());
        this.logout = jasmine.createSpy('logout').and.returnValue(Promise.resolve());
        this.initialiseAuthentication = jasmine.createSpy('initialiseAuthentication');
        this.determineAuthenticationMode = jasmine.createSpy('determineAuthenticationMode');
        this.logoutEnabled = jasmine.createSpy('logoutEnabled').and.returnValue(true);
        this.setEmployeeId = jasmine.createSpy('setEmployeeId').and.returnValue(Promise.resolve());
        this.expireTokens = jasmine.createSpy('expireTokens').and.returnValue(Promise.resolve());
    }
    return AuthenticationProviderMock;
}());
export { AuthenticationProviderMock };
//# sourceMappingURL=authentication.mock.js.map