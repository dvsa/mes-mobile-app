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
import { RekeySearchProvider } from '../../providers/rekey-search/rekey-search';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CompressionProvider } from '../../providers/compression/compression';
import { SearchProvider } from '../../providers/search/search';
import { SEARCH_BOOKED_TEST, SearchBookedTestSuccess, SearchBookedTestFailure, } from './rekey-search.actions';
import { RekeySearchErrorMessages } from './rekey-search-error-model';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';
var RekeySearchEffects = /** @class */ (function () {
    function RekeySearchEffects(actions$, testSearchProvider, rekeySearchProvider, compressionProvider) {
        var _this = this;
        this.actions$ = actions$;
        this.testSearchProvider = testSearchProvider;
        this.rekeySearchProvider = rekeySearchProvider;
        this.compressionProvider = compressionProvider;
        this.getBooking$ = this.actions$.pipe(ofType(SEARCH_BOOKED_TEST), switchMap(function (action) {
            return _this.testSearchProvider.getTestResult(action.appRef, action.staffNumber).pipe(switchMap(function (response) {
                return of(new SearchBookedTestFailure({
                    message: RekeySearchErrorMessages.BookingAlreadyCompleted,
                }));
            }), catchError(function (err) {
                if (err.status === HttpStatusCodes.BAD_REQUEST) {
                    var rekeySearchParams = {
                        applicationReference: action.appRef,
                        staffNumber: action.staffNumber,
                    };
                    return _this.rekeySearchProvider.getBooking(rekeySearchParams).pipe(map(function (response) { return _this.compressionProvider.extractTestSlotResult(response.toString()); }), map(function (testSlot) { return new SearchBookedTestSuccess(testSlot, action.staffNumber); }), catchError(function (err) {
                        return of(new SearchBookedTestFailure(err));
                    }));
                }
                return of(new SearchBookedTestFailure(err));
            }));
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], RekeySearchEffects.prototype, "getBooking$", void 0);
    RekeySearchEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions,
            SearchProvider,
            RekeySearchProvider,
            CompressionProvider])
    ], RekeySearchEffects);
    return RekeySearchEffects;
}());
export { RekeySearchEffects };
//# sourceMappingURL=rekey-search.effects.js.map