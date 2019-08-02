import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { getTests } from '../../modules/tests/tests.reducer';
import { switchMap, take, mapTo } from 'rxjs/operators';
import { DataStoreProvider } from '../data-store/data-store';
import { TestsModel } from '../../modules/tests/tests.model';
import { DateTime } from '../../shared/helpers/date-time';
import { AppConfigProvider } from '../app-config/app-config';

@Injectable()
export class TestPersistenceProvider {

  constructor(
    private store$: Store<StoreModel>,
    private dataStoreProvider: DataStoreProvider,
    private appConfigProvider: AppConfigProvider,
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
    return this.clearCachedTests(testsModel);
  }

  async clearPersistedTests(): Promise<void> {
    await this.dataStoreProvider.removeItem(this.testKeychainKey);
  }

  clearCachedTests(tests: TestsModel): TestsModel {
    if (tests === null) {
      return null;
    }

    const testsToDelete = this.getTestsToDelete(tests);

    return {
      currentTest: {
        slotId: this.shouldResetCurrentTest(tests.currentTest.slotId , testsToDelete) ? null : tests.currentTest.slotId,
      },
      startedTests: {
        ...this.deleteTestsFromTestObject(tests.startedTests, testsToDelete),
      },
      testStatus: {
        ...this.deleteTestsFromTestObject(tests.testStatus, testsToDelete),
      },
    };

  }

  getTestsToDelete(tests: TestsModel): string[] {
    return  Object.keys(tests.startedTests).filter((key) => {
      const startDate: DateTime = new DateTime(tests.startedTests[key].journalData.testSlotAttributes.start);
      return startDate.daysDiff(new DateTime()) > this.appConfigProvider.getAppConfig().daysToCacheJournalData;
    });
  }

  deleteTestsFromTestObject(testObject: any , keysToDelete: string[]): any {
    keysToDelete.forEach((key) => {
      delete testObject[key];
    });
    return testObject;
  }

  shouldResetCurrentTest(slotId: string, keysToDelete: string[]): boolean {
    return keysToDelete.includes(slotId);
  }
}
