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
import { initialState, journalReducer } from '../journal.reducer';
import { LoadJournal, LoadJournalSuccess, UnloadJournal, UnsetError, ClearChangedSlot, CandidateDetailsSeen, LoadCompletedTestsSuccess, } from '../journal.actions';
import { SlotItem } from '../../../providers/slot-selector/slot-item';
import { ConnectionStatus } from '../../../providers/network-state/network-state';
import { searchResultsMock } from '../../../providers/search/__mocks__/search-results.mock';
describe('Journal Reducer', function () {
    describe('undefined action', function () {
        it('should return the default state', function () {
            var action = { type: 'NOOP' };
            var result = journalReducer(undefined, action);
            expect(result).toBe(initialState);
        });
    });
    describe('[JournalPage] Load Journal', function () {
        it('should toggle loading state', function () {
            var action = new LoadJournal();
            var result = journalReducer(initialState, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { isLoading: true, error: { message: '', status: 0, statusText: '' } }));
        });
    });
    describe('[JournalPage] Load Journal Success', function () {
        it('should toggle loading state and populate slots + examiner', function () {
            var _a, _b;
            var actionPayload = {
                examiner: { staffNumber: '123', individualId: 456 },
                slotItemsByDate: (_a = {},
                    _a['2019-01-13'] = [{
                            hasSlotChanged: false,
                            hasSeenCandidateDetails: false,
                            slotData: {},
                        },
                    ],
                    _a),
            };
            var action = new LoadJournalSuccess(actionPayload, ConnectionStatus.ONLINE, false, new Date());
            var state = __assign(__assign({}, initialState), { selectedDate: '2019-01-13' });
            var result = journalReducer(state, action);
            expect(result).toEqual(__assign(__assign({}, state), { isLoading: false, lastRefreshed: jasmine.any(Date), slots: (_b = {},
                    _b['2019-01-13'] = [{
                            hasSlotChanged: false,
                            hasSeenCandidateDetails: false,
                            slotData: {},
                        },
                    ],
                    _b), examiner: { staffNumber: '123', individualId: 456 } }));
        });
    });
    describe('[JournalPage] Unload Journal', function () {
        it('should clear the journal slots', function () {
            var _a;
            var stateWithJournals = __assign(__assign({}, initialState), { slots: (_a = {}, _a['2019-01-13'] = [new SlotItem({}, false, false)], _a) });
            var action = new UnloadJournal();
            var result = journalReducer(stateWithJournals, action);
            expect(result.slots).toEqual({});
        });
        it('should reset the rest of the journal to default state', function () {
            var _a;
            var stateWithJournals = {
                isLoading: true,
                lastRefreshed: new Date(),
                selectedDate: 'dummy',
                slots: (_a = {}, _a['2019-01-13'] = [new SlotItem({}, false, false)], _a),
                examiner: { staffNumber: '123', individualId: 456 },
                checkComplete: [],
                completedTests: [],
            };
            var action = new UnloadJournal();
            var result = journalReducer(stateWithJournals, action);
            expect(result.isLoading).toBe(false);
            expect(result.lastRefreshed).toBeNull();
            expect(result.selectedDate).toBe('');
            expect(result.examiner).toBeNull();
        });
    });
    describe('[JournalPage] Unset error', function () {
        it('should remove any journal error in the state', function () {
            var stateWithError = __assign(__assign({}, initialState), { error: { message: '', status: 0, statusText: '' } });
            var action = new UnsetError();
            var result = journalReducer(stateWithError, action);
            expect(result.error).toBeUndefined();
        });
    });
    describe('[JournalPage] Clear Changed Slot', function () {
        it('should clear hasChangedState flag on specified slot', function () {
            var _a;
            var slotDate = '2019-01-13';
            var stateWithChangedSlot = __assign(__assign({}, initialState), { selectedDate: slotDate, slots: (_a = {},
                    _a["" + slotDate] = [new SlotItem({ slotDetail: { slotId: 1234 } }, true, false)],
                    _a) });
            var action = new ClearChangedSlot(1234);
            var result = journalReducer(stateWithChangedSlot, action);
            expect(result.slots[slotDate][0].hasSlotChanged).toEqual(false);
        });
    });
    describe('[JournalPage] Candidate Details Seen', function () {
        it('should record that has seen candidate details for a specific slot', function () {
            var _a;
            var slotDate = '2019-01-13';
            var stateWithChangedSlot = __assign(__assign({}, initialState), { selectedDate: slotDate, slots: (_a = {},
                    _a["" + slotDate] = [new SlotItem({ slotDetail: { slotId: 1234 } }, true, false)],
                    _a) });
            var action = new CandidateDetailsSeen(1234);
            var result = journalReducer(stateWithChangedSlot, action);
            expect(result.slots[slotDate][0].hasSeenCandidateDetails).toEqual(true);
        });
    });
    describe('[JournalEffect] Load Completed Tests Success', function () {
        it('should save competed test details and also set loading state to false', function () {
            var state = __assign(__assign({}, initialState), { isLoading: true });
            var action = new LoadCompletedTestsSuccess(searchResultsMock);
            var result = journalReducer(state, action);
            expect(result.isLoading).toBe(false);
            expect(result.completedTests).toEqual(searchResultsMock);
        });
    });
});
//# sourceMappingURL=journal.reducer.spec.js.map