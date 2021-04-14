var TestPersistenceProviderMock = /** @class */ (function () {
    function TestPersistenceProviderMock() {
        this.persistTests = jasmine.createSpy('persistTests');
        this.loadPersistedTests = jasmine.createSpy('loadPersistedTests');
        this.clearPersistedTests = jasmine.createSpy('clearPersistedTests');
    }
    return TestPersistenceProviderMock;
}());
export { TestPersistenceProviderMock };
//# sourceMappingURL=test-persistence.mock.js.map