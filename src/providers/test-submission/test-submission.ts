import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { UrlProvider } from '../url/url';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { gzipSync } from 'zlib';
import { catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { isNull, unset, isObject } from 'lodash';

export interface TestToSubmit {
  index: number;
  slotId: string;
  payload: StandardCarTestCATBSchema;
}

@Injectable()
export class TestSubmissionProvider {

  constructor(
    public httpClient : HttpClient,
    public urlProvider : UrlProvider,
  ) {}

  submitTests = (testsToSubmit: TestToSubmit[]): Observable<HttpResponse<any>[]> => {
    const requests: Observable<any>[] = testsToSubmit.map(test => this.submitTest(test));
    return forkJoin(requests);
  }

  submitTest = (testToSubmit: TestToSubmit): Observable<HttpResponse<any>> =>
    this.httpClient.post(
      this.urlProvider.getTestResultServiceUrl(),
      this.compressData(this.removeNullFieldsDeep(testToSubmit.payload)),
      { observe: 'response' },
    )
    // Note: Catching failures here (the inner observable) is what allows us to coordinate
    // subsequent success/fail actions in sendCompletedTestsEffect$ (the outer observable)
    .pipe(
      catchError(err => of(err)),
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
