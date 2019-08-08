// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RekeySearchParams } from './rekey-search.model';
// import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RekeySearchProvider {

  constructor(
    // private httpClient: HttpClient,
    // private urlProvider: UrlProvider,
  ) { }

  getTest(rekeySearchParams: RekeySearchParams): Observable<string> {
    return of(this.zippedMockTestData);
    // return this.httpClient.get(
    //   this.urlProvider.getRekeySearchUrl(rekeySearchParams.staffNumber),
    //   {
    //     params: {
    //       appRef: rekeySearchParams.applicationReference,
    //     },
    //   },
    // );
  }

  // tslint:disable
  private zippedMockTestData: string = 'H4sIAAAAAAAAA21TwY7aMBD9lchnkJwEFsItG9i2UkurgqpWVQ/GHoi1Tpzazi5o1X/fmSTLAuop9rw345k3Ly9sZ+2jrg9s8cJE0xgtRdC2vrl+UmwRJ+lkejcbvWVs4G8LtQS2SEdMliAfl/qgAxJHDOqgg4EKvwUhbLEXxgMCxwC1ArUFH87BxtmDA+/1E+RS4uGM+AakFmYNoDDIClErrUSAqBQ+Uidv4KgFu+YVVmFP7NdqcwOs/vd2wEuBFQ/WnTArjzHpCUotDXwA4Xb2SNE22AqFkAg+g/HlRYl/OPxbW6Ta+ZIr5bpZUMn++FnXEGO5ONqETlb8OoCAVS8YCTI2toLGCBT3CkoHKNjnGpHG+iD7afP7OInSYsku2+m2xuOLyFpUXZN77XzoL+zBWEd79FjRiHP4G07vLT3TrRIjXzROg/WVw0W5dVvtwBFxlX/f8HiaJDzPso8FZlR2pw1swUBT2ppy+exuOol6C1HnTlfCna4YBEZosHnGaXEgba1uOZM0iSOezbEacmiir/t77UJJqmbZfMzjcUorhFDWWupwGtyQY+xA26eOH2iKxsGTtq1HT0kwZnD9b5bLENl9VIvQOmB/kOmNDUsIQhuSTrVu4E5nPdbLTDr7IBz6giU8zsYcu5lv+RyxBef0ZOc1/CVcb5TuRMlTGms0BAb5V0dRNQYiclo0JCEFNz5MtPq5LWKqOrh1e2pggIp3D2+wv3dkRj+gqNBJ7of2OnT/fe/iV2JTfUEJBAAA';

}
