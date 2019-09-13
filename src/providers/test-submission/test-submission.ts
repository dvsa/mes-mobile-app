import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { UrlProvider } from '../url/url';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { gzipSync } from 'zlib';
import { catchError, timeout } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { isNull, unset, isObject, cloneDeep } from 'lodash';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { SaveLog } from '../../modules/logs/logs.actions';
import { LogType } from '../../shared/models/log.model';
import { LogHelper } from '../logs/logsHelper';
import { AppConfigProvider } from '../app-config/app-config';
import { TestStatus } from '../../modules/tests/test-status/test-status.model';

export interface TestToSubmit {
  index: number;
  slotId: string;
  payload: StandardCarTestCATBSchema;
  status: TestStatus;
}

@Injectable()
export class TestSubmissionProvider {

  constructor(
    public httpClient: HttpClient,
    public urlProvider: UrlProvider,
    private store$: Store<StoreModel>,
    private logHelper: LogHelper,
    private appConfig: AppConfigProvider,
  ) { }

  submitTests = (testsToSubmit: TestToSubmit[]): Observable<HttpResponse<any>[]> => {
    const requests: Observable<any>[] = testsToSubmit.map(test => this.submitTest(test));
    return forkJoin(requests);
  }

  submitTest = (testToSubmit: TestToSubmit): Observable<HttpResponse<any> | HttpErrorResponse> => {
    const deepClonedData = cloneDeep(testToSubmit.payload);
    const cleanData = this.removeNullFieldsDeep(
      testToSubmit.status === TestStatus.WriteUp
        ? this.removeFieldsForPartialData(deepClonedData)
        : deepClonedData);

    return this.httpClient.post(
      this.buildUrl(testToSubmit.status),
      this.compressData(cleanData),
      // Using cloneDeep() to prevent the initialState of the reducers from being modified
      { observe: 'response' },
    )
      // Note: Catching failures here (the inner observable) is what allows us to coordinate
      // subsequent success/fail actions in sendCompletedTestsEffect$ (the outer observable)
      .pipe(
        timeout(this.appConfig.getAppConfig().requestTimeout),
        catchError((err: HttpErrorResponse) => {
          this.store$.dispatch(new SaveLog(this.logHelper
            .createLog(LogType.ERROR, `Submitting test with slot ID ${testToSubmit.slotId}`, err.message)));
          return of(err);
        }),
      );
  }

  buildUrl = (testStatus: TestStatus): string =>
  `${this.urlProvider.getTestResultServiceUrl()}?partial=${testStatus === TestStatus.WriteUp}`

  compressData = (data: Partial<StandardCarTestCATBSchema>): string =>
    gzipSync(JSON.stringify(data)).toString('base64')

  removeNullFieldsDeep = (data: Partial<StandardCarTestCATBSchema>): Partial<StandardCarTestCATBSchema> => {
    const removeNullFields = (object: Partial<StandardCarTestCATBSchema>) => {
      Object.keys(object).forEach((key) => {
        const value = object[key];
        if (isNull(value)) unset(object, key);
        if (isObject(value)) removeNullFields(value);
      });
      return object;
    };
    return removeNullFields(data);
  }
  removeFieldsForPartialData = (data: StandardCarTestCATBSchema): Partial<StandardCarTestCATBSchema> => {
    data.testSummary = null;
    return data;
  }
}
