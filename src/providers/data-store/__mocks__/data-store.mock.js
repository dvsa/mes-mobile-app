var DataStoreProviderMock = /** @class */ (function () {
    function DataStoreProviderMock() {
        this.setItem = jasmine.createSpy('setItem').and.returnValue(Promise.resolve('set'));
        this.getItem = jasmine.createSpy('getItem').and.returnValue(Promise.resolve('get'));
        this.setSecureContainer = jasmine.createSpy('setSecureContainer').and.returnValue(Promise.resolve());
        this.removeItem = jasmine.createSpy('removeItem');
        this.getKeys = jasmine.createSpy('getKeys').and.returnValue(Promise.resolve(['TESTS']));
    }
    return DataStoreProviderMock;
}());
export { DataStoreProviderMock };
//# sourceMappingURL=data-store.mock.js.map