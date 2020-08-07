import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { getDelegatedBooking } from './mock-data/delegated-mock-data';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

@Injectable()
export class DelegatedRekeySearchProvider {

  applicationReferences = [
    { referenceNumber: '12345678910', testCategory: TestCategory.BE },
    { referenceNumber: '12345678911', testCategory: TestCategory.C },
    { referenceNumber: '12345678912', testCategory: TestCategory.C1 },
    { referenceNumber: '12345678913', testCategory: TestCategory.C1E },
    { referenceNumber: '12345678914', testCategory: TestCategory.CE },
    { referenceNumber: '12345678915', testCategory: TestCategory.D },
    { referenceNumber: '12345678916', testCategory: TestCategory.D1 },
    { referenceNumber: '12345678917', testCategory: TestCategory.DE },
    { referenceNumber: '12345678918', testCategory: TestCategory.D1E },
  ];
  constructor() {
  }

  getDelegatedExaminerBookingByAppRef(applicationReference: string): Observable<Object> {
    // @TODO - MES-5436 mock responses added. Implementation needed once delegated end point is available
    this.applicationReferences.forEach((ref) => {
      if (applicationReference === ref.referenceNumber) {
        return of(new HttpResponse({
          status: 200,
          body: getDelegatedBooking(ref.testCategory),
        }));
      }
    });
    if (applicationReference === '12345678919') {
      return throwError(new HttpErrorResponse({
        error: 'Internal server error',
        status: 500,
      }));
    }
    return of(new HttpResponse({
      status: 204,
    }));
  }

}
