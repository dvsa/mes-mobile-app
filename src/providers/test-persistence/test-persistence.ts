import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { getTests } from '../../modules/tests/tests.reducer';
import { switchMap, tap } from 'rxjs/operators';
import { DataStoreProvider } from '../data-store/data-store';
import { from } from 'rxjs/observable/from';

@Injectable()
export class TestPersistenceProvider {

  constructor(
    private store$: Store<StoreModel>,
    private dataStoreProvider: DataStoreProvider,
  ) {}

  persistAllTests(): Observable<string> {
    return this.store$.pipe(
      select(getTests),
      tap(tests => console.log(`trying to persist tests: ${JSON.stringify(tests)}`)),
      switchMap(tests => from(this.dataStoreProvider.setItem('TESTS', JSON.stringify(tests)).then(x => x))),
      tap(tests => console.log(`PERSISTED: ${tests}`)),
      switchMap(_ => from(this.dataStoreProvider.getItem('TESTS').then(x => x))),
      tap(read => console.log(`READ BACK: ${read}`)),
    );
  }

}
