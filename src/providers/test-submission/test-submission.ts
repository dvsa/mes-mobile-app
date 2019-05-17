import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { UrlProvider } from '../url/url';
import { HttpClient } from '@angular/common/http';
import { gzipSync } from 'zlib';

@Injectable()
export class TestSubmissionProvider {

  constructor(
    public httpClient : HttpClient,
    public urlProvider : UrlProvider,
  ) {}

  submitTests = (data: StandardCarTestCATBSchema[]): Observable<any> =>
    this.httpClient.post(
      this.urlProvider.getTestResultServiceUrl(),
      this.compressData(data),
    )

  compressData = (data: any): string =>
    gzipSync(JSON.stringify(data)).toString('base64')
}
