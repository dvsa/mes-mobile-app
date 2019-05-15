import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { UrlProvider } from '../url/url';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestSubmissionProvider {

  constructor(
    public httpClient : HttpClient,
    public urlProvider : UrlProvider,
    ) {}

  submitTests = (data: StandardCarTestCATBSchema[]): Observable<any> => {
    return this.httpClient.post(
      this.urlProvider.getTestResultServiceUrl(),
      data,
    );
  }
}
