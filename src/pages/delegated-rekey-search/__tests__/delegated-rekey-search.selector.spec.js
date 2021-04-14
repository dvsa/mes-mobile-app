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
import { initialState } from '../delegated-rekey-search.reducer';
import { getIsLoading, getHasSearched, getBookedTestSlot } from '../delegated-rekey-search.selector';
describe('Delegated Rekey Search Selector', function () {
    describe('getIsLoading', function () {
        it('should return the correct isLoading value', function () {
            var state = __assign(__assign({}, initialState), { isLoading: true });
            var isLoading = getIsLoading(state);
            expect(isLoading).toBe(state.isLoading);
        });
    });
    describe('getHasSearched', function () {
        it('should return the correct hasSearched value', function () {
            var state = __assign(__assign({}, initialState), { hasSearched: true });
            var hasSearched = getHasSearched(state);
            expect(hasSearched).toBe(state.hasSearched);
        });
    });
    describe('getBookedTestSlot', function () {
        it('should return the correct bookedTestSlot value', function () {
            var state = __assign(__assign({}, initialState), { bookedTestSlot: {
                    booking: {
                        application: {
                            applicationId: 22123411,
                            bookingSequence: 3,
                            checkDigit: 1,
                            testCategory: 'H',
                        },
                        candidate: {
                            candidateName: {
                                firstName: 'A Delegated',
                                lastName: 'Candidate',
                            },
                            driverNumber: 'DAVID015220A99HC',
                            dateOfBirth: '1980-01-01',
                        },
                    },
                    slotDetail: {
                        slotId: 1234567,
                        start: '2020-07-15T08:10:00',
                    },
                    vehicleTypeCode: 'C',
                } });
            var bookedTestSlot = getBookedTestSlot(state);
            expect(bookedTestSlot).toEqual(state.bookedTestSlot);
        });
    });
});
//# sourceMappingURL=delegated-rekey-search.selector.spec.js.map