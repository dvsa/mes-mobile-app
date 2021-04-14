var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DelegatedRekeySearchProvider } from '../../providers/delegated-rekey-search/delegated-rekey-search';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SEARCH_BOOKED_DELEGATED_TEST, SearchBookedDelegatedTestSuccess, SearchBookedDelegatedTestFailure, } from './delegated-rekey-search.actions';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';
import { SearchProvider } from '../../providers/search/search';
import { DelegatedRekeySearchErrorMessages } from './delegated-rekey-search-error-model';
var DelegatedRekeySearchEffects = /** @class */ (function () {
    function DelegatedRekeySearchEffects(actions$, delegatedRekeySearchProvider, testSearchProvider) {
        var _this = this;
        this.actions$ = actions$;
        this.delegatedRekeySearchProvider = delegatedRekeySearchProvider;
        this.testSearchProvider = testSearchProvider;
        this.getBooking$ = this.actions$.pipe(ofType(SEARCH_BOOKED_DELEGATED_TEST), switchMap(function (action) {
            return _this.testSearchProvider.getTestResult(action.appRef, undefined).pipe(switchMap(function (response) {
                return of(new SearchBookedDelegatedTestFailure({
                    message: DelegatedRekeySearchErrorMessages.BookingAlreadyCompleted,
                }));
            }), catchError(function (err) {
                if (err.status === HttpStatusCodes.BAD_REQUEST) {
                    return _this.delegatedRekeySearchProvider.getDelegatedExaminerBookingByAppRef(action.appRef).pipe(switchMap(function (response) {
                        var delegatedExaminerTestSlot;
                        try {
                            delegatedExaminerTestSlot = {
                                testCentre: {
                                    centreId: response.testSlot.testCentre.centreId,
                                    centreName: response.testSlot.testCentre.centreName,
                                    costCode: response.testSlot.testCentre.costCode,
                                },
                                booking: {
                                    application: {
                                        applicationId: response.testSlot.booking.application.applicationId,
                                        bookingSequence: response.testSlot.booking.application.bookingSequence,
                                        checkDigit: response.testSlot.booking.application.checkDigit,
                                        testCategory: response.testSlot.booking.application.testCategory,
                                        welshTest: false,
                                        extendedTest: false,
                                    },
                                    candidate: {
                                        candidateId: response.testSlot.booking.candidate.candidateId,
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
                        }
                        catch (err) {
                            return of(new SearchBookedDelegatedTestFailure({
                                message: DelegatedRekeySearchErrorMessages.MappingToTestSlotError,
                            }));
                        }
                    }));
                }
                return of(new SearchBookedDelegatedTestFailure(err));
            }), catchError(function (err) { return of(new SearchBookedDelegatedTestFailure(err)); }));
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], DelegatedRekeySearchEffects.prototype, "getBooking$", void 0);
    DelegatedRekeySearchEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions,
            DelegatedRekeySearchProvider,
            SearchProvider])
    ], DelegatedRekeySearchEffects);
    return DelegatedRekeySearchEffects;
}());
export { DelegatedRekeySearchEffects };
//# sourceMappingURL=delegated-rekey-search.effects.js.map