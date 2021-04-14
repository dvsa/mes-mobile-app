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
import * as testActions from './../../modules/tests/tests.actions';
import * as rekeyActions from './../../modules/tests/rekey/rekey.actions';
import * as rekeyReasonActions from './rekey-reason.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = {
    uploadStatus: {
        isUploading: false,
        hasUploadSucceeded: false,
        hasUploadFailed: false,
        isDuplicate: false,
        hasStaffNumberFailedValidation: false,
    },
};
export function rekeyReasonReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case rekeyActions.END_REKEY:
            return __assign({}, initialState);
        case testActions.SEND_CURRENT_TEST:
            return __assign(__assign({}, state), { uploadStatus: __assign(__assign({}, initialState.uploadStatus), { isUploading: true }) });
        case testActions.SEND_CURRENT_TEST_SUCCESS:
            return __assign(__assign({}, state), { uploadStatus: __assign(__assign({}, initialState.uploadStatus), { hasUploadSucceeded: true }) });
        case testActions.SEND_CURRENT_TEST_FAILURE:
            return __assign(__assign({}, state), { uploadStatus: __assign(__assign({}, initialState.uploadStatus), { hasUploadFailed: true, isDuplicate: action.isDuplicateUpload }) });
        case rekeyReasonActions.REKEY_REASON_VIEW_DID_ENTER:
            return __assign(__assign({}, state), { uploadStatus: __assign({}, initialState.uploadStatus) });
        case rekeyReasonActions.VALIDATE_TRANSFER_REKEY:
            return __assign(__assign({}, state), { uploadStatus: __assign(__assign({}, initialState.uploadStatus), { isUploading: true }) });
        case rekeyReasonActions.VALIDATE_TRANSFER_REKEY_FAILED:
            return __assign(__assign({}, state), { uploadStatus: __assign(__assign({}, initialState.uploadStatus), { hasUploadFailed: !action.staffNumberNotFound, hasStaffNumberFailedValidation: action.staffNumberNotFound }) });
        case rekeyReasonActions.RESET_STAFF_NUMBER_VALIDATION_ERROR:
            return __assign(__assign({}, state), { uploadStatus: __assign(__assign({}, state.uploadStatus), { hasStaffNumberFailedValidation: false }) });
        default:
            return state;
    }
}
export var getRekeyReasonState = createFeatureSelector('rekeyReason');
//# sourceMappingURL=rekey-reason.reducer.js.map