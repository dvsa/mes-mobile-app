export class TestPersistenceProviderMock {
  persistAllTests = jasmine.createSpy('persistAllTests');
  clearPersistedTests = jasmine.createSpy('clearPersistedTests');
}
