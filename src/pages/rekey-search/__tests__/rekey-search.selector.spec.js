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
import { initialState } from '../rekey-search.reducer';
import { getIsLoading, getHasSearched, getBookedTestSlot } from '../rekey-search.selector';
describe('Rekey Search Selector', function () {
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
                            applicationId: 1234567,
                            bookingSequence: 3,
                            checkDigit: 1,
                            entitlementCheck: false,
                            extendedTest: false,
                            progressiveAccess: false,
                            specialNeeds: 'Candidate has dyslexia',
                            specialNeedsExtendedTest: false,
                            testCategory: 'A1',
                            welshTest: false,
                        },
                        candidate: {
                            candidateAddress: {
                                addressLine1: '1 Station Street',
                                addressLine2: 'Someplace',
                                addressLine3: 'Sometown',
                                postcode: 'AB12 3CD',
                            },
                            candidateId: 101,
                            candidateName: {
                                firstName: 'Florences',
                                lastName: 'Pearson',
                                title: 'Miss',
                            },
                            driverNumber: 'PEARS015220A99HC',
                            mobileTelephone: '07654 123456',
                            primaryTelephone: '01234 567890',
                            secondaryTelephone: '04321 098765',
                            dateOfBirth: '1998-01-31',
                            ethnicityCode: 'A',
                        },
                    },
                    slotDetail: {
                        duration: 57,
                        slotId: 9191911223,
                        start: '2019-08-08T08:10:00',
                    },
                    testCentre: {
                        centreId: 54321,
                        centreName: 'Example Test Centre',
                        costCode: 'EXTC1',
                    },
                    vehicleTypeCode: 'C',
                    vehicleSlotTypeCode: 7,
                    examinerVisiting: false,
                } });
            var bookedTestSlot = getBookedTestSlot(state);
            expect(bookedTestSlot).toEqual(state.bookedTestSlot);
        });
    });
});
//# sourceMappingURL=rekey-search.selector.spec.js.map