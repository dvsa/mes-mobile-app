import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { UrlProvider } from '../url/url';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { gzipSync } from 'zlib';
import { catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { isNull, unset, isObject, cloneDeep } from 'lodash';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { SaveLog } from '../../modules/logs/logs.actions';
import { LogType } from '../../shared/models/log.model';
import { LogHelper } from '../logs/logsHelper';

export interface TestToSubmit {
  index: number;
  slotId: string;
  payload: StandardCarTestCATBSchema;
}

@Injectable()
export class TestSubmissionProvider {

  constructor(
    public httpClient: HttpClient,
    public urlProvider: UrlProvider,
    private store$: Store<StoreModel>,
    private logHelper: LogHelper,
  ) { }

  submitTests = (testsToSubmit: TestToSubmit[]): Observable<HttpResponse<any>[]> => {
    const requests: Observable<any>[] = testsToSubmit.map(test => this.submitTest(test));
    return forkJoin(requests);
  }

  submitTest = (testToSubmit: TestToSubmit): Observable<HttpResponse<any> | HttpErrorResponse> =>
    this.httpClient.post(
      this.urlProvider.getTestResultServiceUrl(),
      this.compressData(this.removeNullFieldsDeep(cloneDeep(testToSubmit.payload))),
      // Using cloneDeep() to prevent the initialState of the reducers from being modified
      { observe: 'response' },
    )
      // Note: Catching failures here (the inner observable) is what allows us to coordinate
      // subsequent success/fail actions in sendCompletedTestsEffect$ (the outer observable)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.store$.dispatch(new SaveLog(this.logHelper
            .createLog(LogType.ERROR, `Submitting test with slot ID ${testToSubmit.slotId}`, err.message)));
          return of(err);
        }),
      )

  compressData = (data: Partial<StandardCarTestCATBSchema>): string =>
    gzipSync(JSON.stringify(data)).toString('base64')

  removeNullFieldsDeep = (data: StandardCarTestCATBSchema): Partial<StandardCarTestCATBSchema> => {
    const removeNullFields = (object) => {
      Object.keys(object).forEach((key) => {
        const value = object[key];
        if (isNull(value)) unset(object, key);
        if (isObject(value)) removeNullFields(value);
      });
      return object;
    };
    return removeNullFields(data);
  }

}
