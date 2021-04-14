var CompletedTestPersistenceProviderMock = /** @class */ (function () {
    function CompletedTestPersistenceProviderMock() {
        this.persistCompletedTests = jasmine.createSpy('persistCompletedTests');
        this.loadCompletedPersistedTests = jasmine.createSpy('loadCompletedPersistedTests');
        this.clearPersistedCompletedTests = jasmine.createSpy('clearPersistedCompletedTests');
    }
    return CompletedTestPersistenceProviderMock;
}());
export { CompletedTestPersistenceProviderMock };
//# sourceMappingURL=completed-test-persistence.mock.js.map