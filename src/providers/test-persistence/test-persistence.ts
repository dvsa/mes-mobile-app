import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { getTests, TestsModel } from '../../modules/tests/tests.reducer';
import { switchMap, take, mapTo } from 'rxjs/operators';
import { DataStoreProvider } from '../data-store/data-store';

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
    const persistedTestJson = await this.dataStoreProvider.getItem(this.testKeychainKey);
    console.log(`GOT TESTS FROM KEYCHAIN: ${persistedTestJson}`);
    return persistedTestJson.length > 0 ? JSON.parse(persistedTestJson) : null;
  }

  async clearPersistedTests(): Promise<void> {
    await this.dataStoreProvider.removeItem(this.testKeychainKey);
  }

}
