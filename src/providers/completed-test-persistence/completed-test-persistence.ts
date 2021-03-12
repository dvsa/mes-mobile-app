import { Injectable } from '@angular/core';
import { DataStoreProvider } from '../data-store/data-store';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { LoadCompletedTestsSuccess } from '../../modules/journal/journal.actions';

@Injectable()
export class CompletedTestPersistenceProvider {

  constructor(
    private dataStoreProvider: DataStoreProvider,
    private store$: Store<StoreModel>,
  ) {}

  private completedTestKeychainKey = 'COMPLETED_TESTS';

  async persistCompletedTests(completedTests: SearchResultTestSchema[]): Promise<void> {
    await this.dataStoreProvider.setItem(this.completedTestKeychainKey, JSON.stringify(completedTests));
  }

  async loadPersistedTests(): Promise<void> {
    let completedTests: SearchResultTestSchema[] | null = null;
    try {
      const persistedTestJson = await this.dataStoreProvider.getItem(this.completedTestKeychainKey);
      completedTests = persistedTestJson.length > 0 ? JSON.parse(persistedTestJson) : null;
      if (!!completedTests) {
        this.store$.dispatch(new LoadCompletedTestsSuccess(completedTests));
      }
    } catch (err) {
      if (!/The specified item could not be found in the keychain/.test(err)) {
        console.error(`Error loading completed persisted tests: ${err}`);
      }
    }
  }

}
