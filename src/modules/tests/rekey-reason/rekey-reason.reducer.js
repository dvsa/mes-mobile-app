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
import { IPAD_ISSUE_SELECTED, IPAD_ISSUE_TECH_FAULT, IPAD_ISSUE_LOST, IPAD_ISSUE_STOLEN, IPAD_ISSUE_BROKEN, TRANSFER_SELECTED, OTHER_SELECTED, OTHER_REASON_UPDATED, } from './rekey-reason.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = {
    ipadIssue: {
        selected: false,
        broken: false,
        lost: false,
        technicalFault: false,
        stolen: false,
    },
    other: {
        selected: false,
        reason: '',
    },
    transfer: {
        selected: false,
    },
};
export function rekeyReasonReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case IPAD_ISSUE_SELECTED:
            return __assign(__assign({}, state), { ipadIssue: {
                    selected: action.selectedValue,
                    broken: false,
                    lost: false,
                    technicalFault: action.selectedValue,
                    stolen: false,
                } });
        case IPAD_ISSUE_TECH_FAULT:
            return __assign(__assign({}, state), { ipadIssue: __assign(__assign({}, initialState.ipadIssue), { selected: true, technicalFault: true }) });
        case IPAD_ISSUE_LOST:
            return __assign(__assign({}, state), { ipadIssue: __assign(__assign({}, initialState.ipadIssue), { selected: true, lost: true }) });
        case IPAD_ISSUE_STOLEN:
            return __assign(__assign({}, state), { ipadIssue: __assign(__assign({}, initialState.ipadIssue), { selected: true, stolen: true }) });
        case IPAD_ISSUE_BROKEN:
            return __assign(__assign({}, state), { ipadIssue: __assign(__assign({}, initialState.ipadIssue), { selected: true, broken: true }) });
        case TRANSFER_SELECTED:
            return __assign(__assign({}, state), { transfer: __assign(__assign({}, initialState.transfer), { selected: action.selectedValue }) });
        case OTHER_SELECTED:
            return __assign(__assign({}, state), { other: __assign(__assign({}, initialState.other), { selected: action.selectedValue }) });
        case OTHER_REASON_UPDATED:
            return __assign(__assign({}, state), { other: __assign(__assign({}, initialState.other), { selected: true, reason: action.otherReason }) });
        default:
            return state;
    }
}
export var getRekeyReason = createFeatureSelector('rekeyReason');
//# sourceMappingURL=rekey-reason.reducer.js.map