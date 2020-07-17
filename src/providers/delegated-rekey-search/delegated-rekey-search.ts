import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delegatedBooking } from './mock-data/delegated-mock-data';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable()
export class DelegatedRekeySearchProvider {
  constructor() {
  }

  getDelegatedExaminerBookingByAppRef(applicationReference: string): Observable<Object> {
    console.log(applicationReference);
    // @TODO - MES-5436 mock responses added. Implementation needed once delegated end point is available
    if (applicationReference === '12345678910') {
      return of(new HttpResponse({
        status: 200,
        body: delegatedBooking,
      }));
    }
    if (applicationReference === '12345678911') {
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
