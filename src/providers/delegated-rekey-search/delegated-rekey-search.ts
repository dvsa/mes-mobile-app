import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { getDelegatedBooking } from './mock-data/delegated-mock-data';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

@Injectable()
export class DelegatedRekeySearchProvider {

  applicationReferences = [
    { referenceNumber: '12345678910', testCategory: TestCategory.BE, isWelshTest: false },
    { referenceNumber: '12345678911', testCategory: TestCategory.BE, isWelshTest: true },
    { referenceNumber: '12345678912', testCategory: TestCategory.C, isWelshTest: false },
    { referenceNumber: '12345678913', testCategory: TestCategory.C, isWelshTest: true },
    { referenceNumber: '12345678914', testCategory: TestCategory.C1, isWelshTest: false },
    { referenceNumber: '12345678915', testCategory: TestCategory.C1, isWelshTest: true },
    { referenceNumber: '12345678916', testCategory: TestCategory.C1E, isWelshTest: false },
    { referenceNumber: '12345678917', testCategory: TestCategory.C1E, isWelshTest: true },
    { referenceNumber: '12345678918', testCategory: TestCategory.CE, isWelshTest: false },
    { referenceNumber: '12345678919', testCategory: TestCategory.CE, isWelshTest: true },
    { referenceNumber: '12345678920', testCategory: TestCategory.D, isWelshTest: false },
    { referenceNumber: '12345678921', testCategory: TestCategory.D, isWelshTest: true },
    { referenceNumber: '12345678922', testCategory: TestCategory.D1, isWelshTest: false },
    { referenceNumber: '12345678923', testCategory: TestCategory.D1, isWelshTest: true },
    { referenceNumber: '12345678924', testCategory: TestCategory.DE, isWelshTest: false },
    { referenceNumber: '12345678925', testCategory: TestCategory.DE, isWelshTest: true },
    { referenceNumber: '12345678926', testCategory: TestCategory.D1E, isWelshTest: false },
    { referenceNumber: '12345678927', testCategory: TestCategory.D1E, isWelshTest: true },
  ];
  constructor() {
  }

  getDelegatedExaminerBookingByAppRef(applicationReference: string): Observable<Object> {
    // @TODO - MES-5436 mock responses added. Implementation needed once delegated end point is available
    const foundReference = this.applicationReferences.find((ref) => {
      return applicationReference === ref.referenceNumber;
    });
    if (foundReference) {
      return of(new HttpResponse({
        status: 200,
        body: getDelegatedBooking(foundReference.testCategory, foundReference.isWelshTest),
      }));
    }
    if (applicationReference === '12345678928') {
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
