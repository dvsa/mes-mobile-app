var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { initialState, rekeySearchReducer } from '../rekey-search.reducer';
import * as rekeySearchActions from '../rekey-search.actions';
import { HttpErrorResponse } from '@angular/common/http';
describe('Rekey Search Reducer', function () {
    it('should turn on loading state when searching for booked tests', function () {
        var state = __assign({}, initialState);
        var appRef = '123456';
        var staffNumber = '654321';
        var action = new rekeySearchActions.SearchBookedTest(appRef, staffNumber);
        var result = rekeySearchReducer(state, action);
        expect(result).toEqual(__assign(__assign({}, initialState), { isLoading: true }));
    });
    it('should store payload, turn loading state off and seached state on when search is successful', function () {
        var state = __assign(__assign({}, initialState), { isLoading: true });
        var testSlot = {
            slotDetail: {
                slotId: 4363463,
            },
            booking: {
                application: {
                    applicationId: 12345,
                    bookingSequence: 11,
                    checkDigit: 1,
                },
            },
        };
        var staffNumber = '654321';
        var action = new rekeySearchActions.SearchBookedTestSuccess(testSlot, staffNumber);
        var result = rekeySearchReducer(state, action);
        expect(result).toEqual(__assign(__assign({}, initialState), { isLoading: false, hasSearched: true, staffNumber: '654321', bookedTestSlot: __assign({}, testSlot) }));
    });
    it('should store error, turn off loading state and searched state on when search was unsuccessful', function () {
        var state = __assign(__assign({}, initialState), { isLoading: true });
        var err = new HttpErrorResponse({
            status: 404,
            statusText: 'Not Found',
            url: 'http://localhost:8100/dummy/search/booking/url?appRef=5235',
            error: 'html error',
        });
        var action = new rekeySearchActions.SearchBookedTestFailure(err);
        var result = rekeySearchReducer(state, action);
        expect(result).toEqual(__assign(__assign({}, initialState), { err: err, isLoading: false, hasSearched: true }));
    });
});
//# sourceMappingURL=rekey-search.reducer.spec.js.map