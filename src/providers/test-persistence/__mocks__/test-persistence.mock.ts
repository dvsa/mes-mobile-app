export class TestPersistenceProviderMock {
  persistAllTests = jasmine.createSpy('persistAllTests');
  loadPersistedTests = jasmine.createSpy('loadPersistedTests');
  clearPersistedTests = jasmine.createSpy('clearPersistedTests');
}
