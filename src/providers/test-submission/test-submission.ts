import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { UrlProvider } from '../url/url';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { gzipSync } from 'zlib';
import { catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';

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

  submitTest = (testToSubmit: TestToSubmit): Observable<any> =>
    this.httpClient.post(
      this.urlProvider.getTestResultServiceUrl(),
      this.compressData(testToSubmit.payload),
    )
    // Note: Catching failures here (the inner observable) is what allows us to coordinate
    // subsequent success/fail actions in sendCompletedTestsEffect$ (the outer observable)
    .pipe(
      catchError(err => of(err)),
    )

  compressData = (data: any): string =>
    gzipSync(JSON.stringify(data)).toString('base64')
}
