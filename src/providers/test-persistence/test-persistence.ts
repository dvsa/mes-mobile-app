import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { getTests } from '../../modules/tests/tests.reducer';
import { switchMap, take, mapTo } from 'rxjs/operators';
import { DataStoreProvider } from '../data-store/data-store';
import { TestsModel } from '../../modules/tests/tests.model';

@Injectable()
export class TestPersistenceProvider {

  constructor(
    private store$: Store<StoreModel>,
    private dataStoreProvider: DataStoreProvider,
  ) {}

  private testKeychainKey = 'TESTS';

  persistAllTests(): Promise<void> {
    return this.store$.pipe(
      select(getTests),
      take(1),
      switchMap(tests => this.dataStoreProvider.setItem(this.testKeychainKey, JSON.stringify(tests))),
      mapTo(undefined),
    ).toPromise();
  }

  async loadPersistedTests(): Promise<TestsModel | null> {
    let testsModel: TestsModel | null = null;
    try {
      const persistedTestJson = await this.dataStoreProvider.getItem(this.testKeychainKey);
      testsModel = persistedTestJson.length > 0 ? JSON.parse(persistedTestJson) : null;
    } catch (err) {
      if (!/The specified item could not be found in the keychain/.test(err)) {
        console.error(`Error loading persisted tests: ${err}`);
      }
    }
    return testsModel;
  }

  async clearPersistedTests(): Promise<void> {
    await this.dataStoreProvider.removeItem(this.testKeychainKey);
  }

}
