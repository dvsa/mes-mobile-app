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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { createFeatureSelector } from '@ngrx/store';
import * as journalActions from './journal.actions';
import { get } from 'lodash';
import { ConnectionStatus } from '../../providers/network-state/network-state';
export var initialState = {
    isLoading: false,
    lastRefreshed: null,
    slots: {},
    selectedDate: '',
    examiner: null,
    completedTests: [],
};
export function journalReducer(state, action) {
    var _a, _b;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case journalActions.LOAD_JOURNAL:
            return __assign(__assign({}, state), { isLoading: true, error: { message: '', status: 0, statusText: '' } });
        case journalActions.CANDIDATE_DETAILS_SEEN:
            return __assign(__assign({}, state), { slots: __assign(__assign({}, state.slots), (_a = {}, _a[state.selectedDate] = state.slots[state.selectedDate].map(function (slot) {
                    if (get(slot, 'slotData.slotDetail.slotId') === action.slotId) {
                        return __assign(__assign({}, slot), { hasSeenCandidateDetails: true });
                    }
                    return slot;
                }), _a)) });
        case journalActions.LOAD_JOURNAL_SUCCESS:
            return __assign(__assign({}, state), { 
                // TODO: The reducer has to get the lastRefreshed date from the action
                // And should not do any logic
                lastRefreshed: (action.onlineOffline ===
                    ConnectionStatus.ONLINE && !action.unAuthenticatedMode) ? new Date() : action.lastRefreshed, isLoading: false, slots: action.payload.slotItemsByDate, examiner: action.payload.examiner });
        case journalActions.LOAD_JOURNAL_FAILURE:
            return __assign(__assign({}, state), { isLoading: false, error: action.payload });
        case journalActions.UNLOAD_JOURNAL:
            return initialState;
        case journalActions.UNSET_ERROR:
            var error = state.error, stateWithoutError = __rest(state, ["error"]);
            return __assign({}, stateWithoutError);
        case journalActions.CLEAR_CHANGED_SLOT:
            // TODO: This should be moved out to an effect
            var slots = state.slots[state.selectedDate].map(function (slot) {
                if (get(slot, 'slotData.slotDetail.slotId') === action.slotId) {
                    return __assign(__assign({}, slot), { hasSlotChanged: false });
                }
                return slot;
            });
            return __assign(__assign({}, state), { slots: __assign(__assign({}, state.slots), (_b = {}, _b[state.selectedDate] = slots, _b)) });
        case journalActions.SET_SELECTED_DAY:
            return __assign(__assign({}, state), { selectedDate: action.payload });
        case journalActions.LOAD_COMPLETED_TESTS_SUCCESS:
            return __assign(__assign({}, state), { isLoading: false, completedTests: action.payload });
        default:
            return state;
    }
}
export var getJournalState = createFeatureSelector('journal');
//# sourceMappingURL=journal.reducer.js.map