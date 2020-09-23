import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DelegatedRekeySearchProvider } from '../../providers/delegated-rekey-search/delegated-rekey-search';
import { switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  SEARCH_BOOKED_DELEGATED_TEST,
  SearchBookedDelegatedTest,
  SearchBookedDelegatedTestSuccess,
  SearchBookedDelegatedTestFailure, DelegatedRekeySearchActionTypes,
} from './delegated-rekey-search.actions';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';
import { SearchProvider } from '../../providers/search/search';
import { DelegatedRekeySearchErrorMessages } from './delegated-rekey-search-error-model';
import { DelegatedExaminerTestSlot } from 'src/providers/delegated-rekey-search/mock-data/delegated-mock-data';

@Injectable()
export class DelegatedRekeySearchEffects {

  constructor(
    private actions$: Actions,
    private delegatedRekeySearchProvider: DelegatedRekeySearchProvider,
    private testSearchProvider: SearchProvider,
  ) {
  }

  @Effect()
  getBooking$ = this.actions$.pipe(
    ofType(SEARCH_BOOKED_DELEGATED_TEST),
    switchMap((action: SearchBookedDelegatedTest) => {
      return this.testSearchProvider.getTestResult(action.appRef, undefined).pipe(
        switchMap((response: HttpResponse<any>): Observable<DelegatedRekeySearchActionTypes> => {
          return of(new SearchBookedDelegatedTestFailure({
            message: DelegatedRekeySearchErrorMessages.BookingAlreadyCompleted,
          }));
        }),
        catchError((err: HttpErrorResponse): Observable<DelegatedRekeySearchActionTypes> => {
          if (err.status === HttpStatusCodes.BAD_REQUEST) {
            return this.delegatedRekeySearchProvider.getDelegatedExaminerBookingByAppRef(action.appRef).pipe(
              switchMap((response: any): Observable<any> => {
                let delegatedExaminerTestSlot: DelegatedExaminerTestSlot;
                try {
                  delegatedExaminerTestSlot = {
                    booking: {
                      application: {
                        applicationId: response.testSlot.booking.application.applicationId,
                        bookingSequence: response.testSlot.booking.application.bookingSequence,
                        checkDigit: response.testSlot.booking.application.checkDigit,
                        testCategory: response.testSlot.booking.application.testCategory,
                        welshTest: false,
                      },
                      candidate: {
                        candidateName: {
                          firstName: response.testSlot.booking.candidate.candidateName.firstName,
                          lastName: response.testSlot.booking.candidate.candidateName.lastName,
                        },
                        driverNumber: response.testSlot.booking.candidate.driverNumber,
                        dateOfBirth: response.testSlot.booking.candidate.dateOfBirth,
                      },
                    },
                    slotDetail: {
                      slotId: response.testSlot.slotDetail.slotId,
                      start: response.testSlot.slotDetail.start,
                    },
                    vehicleTypeCode: response.testSlot.vehicleTypeCode,
                    examinerId: response.examinerId,
                  };
                  return of(new SearchBookedDelegatedTestSuccess(delegatedExaminerTestSlot));
                } catch (err) {
                  return of(
                    new SearchBookedDelegatedTestFailure({
                      message: DelegatedRekeySearchErrorMessages.MappingToTestSlotError,
                    }),
                  );
                }
              }),
            );
          }
          return of(new SearchBookedDelegatedTestFailure(err));
        }),
      );
    }),
  );

}
