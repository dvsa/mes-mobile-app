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
});
