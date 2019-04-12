import { TestBed } from '@angular/core/testing';
import { DataStoreProvider } from '../../data-store/data-store';
import { DataStoreProviderMock } from '../../data-store/__mocks__/data-store.mock';
import { TestPersistenceProvider } from '../test-persistence';
import { StoreModule } from '@ngrx/store';
import { TestsModel } from '../../../modules/tests/tests.reducer';

describe('TestPersistenceProvider', () => {
  let testPersistenceProvider: TestPersistenceProvider;
  let dataStoreProvider;
  const testState: TestsModel = {
    currentTest: { slotId: '123' },
    startedTests: {},
    testLifecycles: {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestPersistenceProvider,
        { provide: DataStoreProvider, useClass: DataStoreProviderMock },
      ],
      imports: [
        StoreModule.forRoot({
          tests: () => testState,
        }),
      ],
    });
    testPersistenceProvider = TestBed.get(TestPersistenceProvider);
    dataStoreProvider = TestBed.get(DataStoreProvider);
  });

  describe('persistAllTests', () => {
    it('should take the tests state slice and pass it to the data store provider stringified', async () => {
      await testPersistenceProvider.persistAllTests();

      expect(dataStoreProvider.setItem).toHaveBeenCalledTimes(1);
      expect(dataStoreProvider.setItem.calls.first().args[0]).toBe('TESTS');
      expect(JSON.parse(dataStoreProvider.setItem.calls.first().args[1])).toEqual(testState);
    });
  });

  describe('loadPersistedTests', () => {
    it('should return the test JSON from the data store parsed into a TestsModel', async () => {
      const persistedTestsModel: TestsModel = {
        currentTest: { slotId: '1' },
        startedTests: {},
        testLifecycles: {},
      };
      dataStoreProvider.getItem.and.returnValue(JSON.stringify(persistedTestsModel));

      const result = await testPersistenceProvider.loadPersistedTests();

      expect(dataStoreProvider.getItem).toHaveBeenCalledWith('TESTS');
      expect(result).toEqual(persistedTestsModel);
    });
    it('should return null if the data store provider throws', async () => {
      dataStoreProvider.getItem.and.throwError('test error');

      const result = await testPersistenceProvider.loadPersistedTests();

      expect(dataStoreProvider.getItem).toHaveBeenCalledWith('TESTS');
      expect(result).toBeNull();
    });
  });

  describe('clearPersistedTests', () => {
    it('should remove item on the data stores test key', async () => {
      await testPersistenceProvider.clearPersistedTests();

      expect(dataStoreProvider.removeItem).toHaveBeenCalledWith('TESTS');
    });
  });
});
