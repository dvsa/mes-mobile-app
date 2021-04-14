import { RekeySearchEffects } from '../rekey-search.effects';
import { ReplaySubject, defer } from 'rxjs';
import { async, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { rekeySearchReducer } from '../rekey-search.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { RekeySearchProvider } from '../../../providers/rekey-search/rekey-search';
import { RekeySearchProviderMock } from '../../../providers/rekey-search/__mocks__/rekey-search.mock';
import * as rekeySearchActions from '../rekey-search.actions';
import { CompressionProvider } from '../../../providers/compression/compression';
import { CompressionProviderMock } from '../../../providers/compression/__mocks__/compression.mock';
import { SearchProvider } from '../../../providers/search/search';
import { SearchProviderMock } from '../../../providers/search/__mocks__/search.mock';
import { RekeySearchErrorMessages } from '../rekey-search-error-model';
import { HttpStatusCodes } from '../../../shared/models/http-status-codes';
import { configureTestSuite } from 'ng-bullet';
describe('Rekey Search Effects', function () {
    var effects;
    var actions$;
    var rekeySearchProvider;
    var compressionProvider;
    var testSearchProvider;
    var appRef = '123456';
    var staffNumber = '654321';
    var getTestResultHttpErrorResponse = function (status) {
        if (status === void 0) { status = 400; }
        return new HttpErrorResponse({
            status: status,
            error: 'Error message',
            statusText: 'Bad request',
        });
    };
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    rekeySearch: rekeySearchReducer,
                }),
            ],
            providers: [
                RekeySearchEffects,
                provideMockActions(function () { return actions$; }),
                { provide: RekeySearchProvider, useClass: RekeySearchProviderMock },
                { provide: SearchProvider, useClass: SearchProviderMock },
                { provide: CompressionProvider, useClass: CompressionProviderMock },
                Store,
            ],
        });
    });
    beforeEach(async(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(RekeySearchEffects);
        testSearchProvider = TestBed.get(SearchProvider);
        rekeySearchProvider = TestBed.get(RekeySearchProvider);
        compressionProvider = TestBed.get(CompressionProvider);
    }));
    it('should dispatch the SearchBookedTestSuccess action when searched with success', function (done) {
        spyOn(testSearchProvider, 'getTestResult')
            .and.returnValue(asyncError(getTestResultHttpErrorResponse(HttpStatusCodes.BAD_REQUEST)));
        spyOn(rekeySearchProvider, 'getBooking').and.callThrough();
        spyOn(compressionProvider, 'extractTestSlotResult');
        actions$.next(new rekeySearchActions.SearchBookedTest(appRef, staffNumber));
        effects.getBooking$.subscribe(function (result) {
            expect(compressionProvider.extractTestSlotResult).toHaveBeenCalled();
            expect(result instanceof rekeySearchActions.SearchBookedTestSuccess).toBeTruthy();
            done();
        });
    });
    it('should dispatch the SearchBookedTestFailure action when searched with failure', function (done) {
        spyOn(testSearchProvider, 'getTestResult')
            .and.returnValue(asyncError(getTestResultHttpErrorResponse(HttpStatusCodes.BAD_REQUEST)));
        spyOn(rekeySearchProvider, 'getBooking').and.returnValue(asyncError(new HttpErrorResponse({
            error: 'Error message',
            status: 403,
            statusText: 'Forbidden',
        })));
        actions$.next(new rekeySearchActions.SearchBookedTest(appRef, staffNumber));
        effects.getBooking$.subscribe(function (result) {
            expect(result instanceof rekeySearchActions.SearchBookedTestFailure).toBeTruthy();
            done();
        });
    });
    it('should call getTestResult on the test search provider', function (done) {
        spyOn(testSearchProvider, 'getTestResult').and.callThrough();
        actions$.next(new rekeySearchActions.SearchBookedTest(appRef, staffNumber));
        effects.getBooking$.subscribe(function (result) {
            expect(testSearchProvider.getTestResult).toHaveBeenCalledWith(appRef, staffNumber);
            done();
        });
    });
    it('should not call getBooking if getTestResult succeeds', function (done) {
        spyOn(rekeySearchProvider, 'getBooking').and.callThrough();
        var expectedFailureAction = new rekeySearchActions.SearchBookedTestFailure({
            message: RekeySearchErrorMessages.BookingAlreadyCompleted,
        });
        actions$.next(new rekeySearchActions.SearchBookedTest(appRef, staffNumber));
        effects.getBooking$.subscribe(function (result) {
            expect(rekeySearchProvider.getBooking).not.toHaveBeenCalled();
            expect(result).toEqual(expectedFailureAction);
            done();
        });
    });
    it('should call getBooking if getTestResult fails with a 400 status code', function (done) {
        spyOn(testSearchProvider, 'getTestResult')
            .and.returnValue(asyncError(getTestResultHttpErrorResponse(HttpStatusCodes.BAD_REQUEST)));
        spyOn(rekeySearchProvider, 'getBooking').and.callThrough();
        actions$.next(new rekeySearchActions.SearchBookedTest(appRef, staffNumber));
        effects.getBooking$.subscribe(function (result) {
            expect(rekeySearchProvider.getBooking).toHaveBeenCalledWith({
                staffNumber: staffNumber,
                applicationReference: appRef,
            });
            expect(result instanceof rekeySearchActions.SearchBookedTestSuccess).toBeTruthy();
            done();
        });
    });
    it('should dispatch a SearchBookedTestFailure action if getTestResult fails with a 500 status code', function (done) {
        spyOn(testSearchProvider, 'getTestResult')
            .and.returnValue(asyncError(getTestResultHttpErrorResponse(HttpStatusCodes.INTERNAL_SERVER_ERROR)));
        spyOn(rekeySearchProvider, 'getBooking').and.callThrough();
        actions$.next(new rekeySearchActions.SearchBookedTest(appRef, staffNumber));
        effects.getBooking$.subscribe(function (result) {
            expect(rekeySearchProvider.getBooking).not.toHaveBeenCalled();
            expect(result instanceof rekeySearchActions.SearchBookedTestFailure).toBeTruthy();
            done();
        });
    });
});
function asyncError(errorObject) {
    return defer(function () { return Promise.reject(errorObject); });
}
//# sourceMappingURL=rekey-search.effects.spec.js.map