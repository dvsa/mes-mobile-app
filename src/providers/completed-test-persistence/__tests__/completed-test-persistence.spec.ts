import { TestBed } from '@angular/core/testing';
import { DataStoreProvider } from '../../data-store/data-store';
import { DataStoreProviderMock } from '../../data-store/__mocks__/data-store.mock';
import { configureTestSuite } from 'ng-bullet';
import { CompletedTestPersistenceProvider } from '../completed-test-persistence';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { LoadCompletedTestsSuccess } from '../../../modules/journal/journal.actions';

describe('TestPersistenceProvider', () => {
  let completedTestPersistenceProvider: CompletedTestPersistenceProvider;
  let dataStoreProvider;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        CompletedTestPersistenceProvider,
        { provide: DataStoreProvider, useClass: DataStoreProviderMock },
      ],
      imports: [
        StoreModule.forRoot({
          journal: () => null,
        }),
      ],
    });
  });

  const completedTests = [
    { applicationReference: 1234 },
    { applicationReference: 567 },
  ] as SearchResultTestSchema[];

  beforeEach(() => {
    dataStoreProvider = TestBed.get(DataStoreProvider);
    completedTestPersistenceProvider = TestBed.get(CompletedTestPersistenceProvider);
    store$ = TestBed.get(Store);
  });

  describe('persistCompletedTests', () => {
    it('should stringify and persist completed tests', async () => {
      await completedTestPersistenceProvider.persistCompletedTests(completedTests);

      expect(dataStoreProvider.setItem).toHaveBeenCalledTimes(1);
      expect(dataStoreProvider.setItem.calls.first().args[0]).toBe('COMPLETED_TESTS');
      expect(JSON.parse(dataStoreProvider.setItem.calls.first().args[1])).toEqual(completedTests);
    });
  });

  describe('loadCompletedPersistedTests', () => {
    it('should get tests from storage and dispatch action', async() => {
      spyOn(dataStoreProvider, 'getItem').and.returnValue(Promise.resolve(JSON.stringify(completedTests)));
      spyOn(store$, 'dispatch');
      await completedTestPersistenceProvider.loadCompletedPersistedTests();
      expect(store$.dispatch).toHaveBeenCalledTimes(1);
      expect(store$.dispatch).toHaveBeenCalledWith(new LoadCompletedTestsSuccess(completedTests));
    });
  });

  describe('clearPersistedCompletedTests', () => {
    it('should clear persisted tests', async() => {
      spyOn(dataStoreProvider, 'getKeys').and.returnValue(Promise.resolve(['COMPLETED_TESTS']));
      await completedTestPersistenceProvider.clearPersistedCompletedTests();
      expect(dataStoreProvider.removeItem).toHaveBeenCalledWith('COMPLETED_TESTS');
    });
  });

});
