import { Injectable } from '@angular/core';
import { RekeySearchParams } from './rekey-search.model';
import { HttpClient } from '@angular/common/http';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';

@Injectable()
export class RekeySearchProvider {

  constructor(
    private httpClient: HttpClient,
    private urlProvider: UrlProvider,
  ) { }

  getTest(rekeySearchParams: RekeySearchParams): Observable<Object> {
    // return of(this.zippedMockTestData);
    return this.httpClient.get(
      this.urlProvider.getRekeySearchUrl(rekeySearchParams.staffNumber),
      {
        params: {
          appRef: rekeySearchParams.applicationReference,
        },
      },
    );
  }

  // tslint:disable
  // private zippedMockTestData: string = 'H4sIAAAAAAAA/21TTY/aMBD9K5HPIMUJLIRbNrBtpZZWBVWtqh6MPRBrnTi1nV3Qqv99Z5IsC6jKIfa8N+P5ePPCdtY+6vrAFi9MNI3RUgRt65vrJ8UWPEkn07vZ6M1jA39bqCWwRTpisgT5uNQHHZA4YlAHHQxU+C8IYYu9MB4QOAaoFagt+HA2Ns4eHHivnyCXEg9nxDcgtTBrAIVGVohaaSUCRKXwkTp5A0ct2DWvsApzYr9Wmxtg9b+3A14KjHiw7oReOUenJyi1NPABhNvZI1nbYCtshETwGYwvL0L8w+Lf0qKunS+5Uq6rBTvZHz/rGjiG49EmdG3FvwMIGPWCkSBjYytojMDmXkHpAAX7XCPSWB9kX21+z5MoLZbsMp1uajG/sKxF1SW5186H/sIejHU0R48RjTibv2H13tIz3SjR8kVjNRhfORyUW7fVDhwRV/n3TcynSRLnWfaxQI/K7rSBLRhoSluTbzy7m06iXkKUudOVcKcrBoERCmyexTQ4kLZWt5xJmvAozuYYDTlU0df9vXahpK5m2Xwc83FKI4RQ1lrqcBrUkKPtQNOnjB+oisbBk7atR01JMGZQ/W+WyxDZfVSL0Dpgf5DpjQ1LCEIbap1q3cCdznqM2hxlnD6eJLgMPgiH8mBJzLNxjEnNt/EcJ7GIY3q5kxxuhuv10p0oxpSqGw2GYQqro6gaAxEJLhqckIKDHwpb/dwWnKIOot2eGhig4l3KG0zzHZnRHooKBeV+aK9Dt/69mF8B7xuEKhAEAAA=';

}
