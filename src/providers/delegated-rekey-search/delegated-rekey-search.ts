import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { getDelegatedBooking } from './mock-data/delegated-mock-data';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

@Injectable()
export class DelegatedRekeySearchProvider {

  applicationReferences = [
    { referenceNumber: '12345678910', testCategory: TestCategory.BE, isWelshTest: false, slotId: 1234567 },
    { referenceNumber: '12345678911', testCategory: TestCategory.BE, isWelshTest: true, slotId: 1234568 },
    { referenceNumber: '12345678912', testCategory: TestCategory.C, isWelshTest: false, slotId: 1234569 },
    { referenceNumber: '12345678913', testCategory: TestCategory.C, isWelshTest: true, slotId: 1234570 },
    { referenceNumber: '12345678914', testCategory: TestCategory.C1, isWelshTest: false, slotId: 1234571 },
    { referenceNumber: '12345678915', testCategory: TestCategory.C1, isWelshTest: true, slotId: 1234572 },
    { referenceNumber: '12345678916', testCategory: TestCategory.C1E, isWelshTest: false, slotId: 1234573 },
    { referenceNumber: '12345678917', testCategory: TestCategory.C1E, isWelshTest: true, slotId: 1234574 },
    { referenceNumber: '12345678918', testCategory: TestCategory.CE, isWelshTest: false, slotId: 1234575 },
    { referenceNumber: '12345678919', testCategory: TestCategory.CE, isWelshTest: true, slotId: 1234576 },
    { referenceNumber: '12345678920', testCategory: TestCategory.D, isWelshTest: false, slotId: 1234577 },
    { referenceNumber: '12345678921', testCategory: TestCategory.D, isWelshTest: true, slotId: 1234578 },
    { referenceNumber: '12345678922', testCategory: TestCategory.D1, isWelshTest: false, slotId: 1234579 },
    { referenceNumber: '12345678923', testCategory: TestCategory.D1, isWelshTest: true, slotId: 1234580 },
    { referenceNumber: '12345678924', testCategory: TestCategory.DE, isWelshTest: false, slotId: 1234581 },
    { referenceNumber: '12345678925', testCategory: TestCategory.DE, isWelshTest: true, slotId: 1234582 },
    { referenceNumber: '12345678926', testCategory: TestCategory.D1E, isWelshTest: false, slotId: 1234583 },
    { referenceNumber: '12345678927', testCategory: TestCategory.D1E, isWelshTest: true, slotId: 1234584 },
    { referenceNumber: '12345678928', testCategory: TestCategory.CCPC, isWelshTest: false, slotId: 1234585 },
    { referenceNumber: '12345678929', testCategory: TestCategory.CCPC, isWelshTest: true, slotId: 1234586 },
    { referenceNumber: '12345678930', testCategory: TestCategory.DCPC, isWelshTest: false, slotId: 1234587 },
    { referenceNumber: '12345678931', testCategory: TestCategory.DCPC, isWelshTest: true, slotId: 1234588 },
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
        body: getDelegatedBooking(foundReference.testCategory, foundReference.isWelshTest, foundReference.slotId),
      }));
    }
    if (applicationReference === '12345678950') {
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
