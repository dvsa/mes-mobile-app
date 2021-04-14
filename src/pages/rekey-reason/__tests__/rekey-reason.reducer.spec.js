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
import { initialState, rekeyReasonReducer } from '../rekey-reason.reducer';
import { SendCurrentTest, SendCurrentTestSuccess, SendCurrentTestFailure, } from './../../../modules/tests/tests.actions';
import { EndRekey } from '../../../modules/tests/rekey/rekey.actions';
import { ValidateTransferRekey, ValidateTransferRekeyFailed, ResetStaffNumberValidationError, } from '../rekey-reason.actions';
describe('Rekey Reason Reducer', function () {
    describe('undefined action', function () {
        it('should return the default state', function () {
            var action = { type: 'NOOP' };
            var result = rekeyReasonReducer(undefined, action);
            expect(result).toBe(initialState);
        });
    });
    describe('[[Rekey Actions] End rekey', function () {
        it('should rexet the state', function () {
            var action = new EndRekey();
            var result = rekeyReasonReducer(initialState, action);
            expect(result).toEqual(initialState);
        });
    });
    describe('[TestsEffects] Send Current Test', function () {
        it('should toggle uploading state', function () {
            var action = new SendCurrentTest();
            var result = rekeyReasonReducer(initialState, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { uploadStatus: __assign(__assign({}, initialState.uploadStatus), { isUploading: true }) }));
        });
    });
    describe('[Tests] Send Test Success', function () {
        it('should toggle has upload succeeded state', function () {
            var action = new SendCurrentTestSuccess();
            var result = rekeyReasonReducer(initialState, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { uploadStatus: __assign(__assign({}, initialState.uploadStatus), { hasUploadSucceeded: true }) }));
        });
    });
    describe('[Tests] Send Test Failure', function () {
        it('should toggle has upload failed state', function () {
            var action = new SendCurrentTestFailure(false);
            var result = rekeyReasonReducer(initialState, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { uploadStatus: __assign(__assign({}, initialState.uploadStatus), { hasUploadFailed: true }) }));
        });
    });
    describe('[Tests] Send Test Failure', function () {
        it('should toggle has upload failed state and duplicate', function () {
            var action = new SendCurrentTestFailure(true);
            var result = rekeyReasonReducer(initialState, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { uploadStatus: __assign(__assign({}, initialState.uploadStatus), { hasUploadFailed: true, isDuplicate: true }) }));
        });
    });
    describe('[RekeyReasonPage] Validate transfer rekey', function () {
        it('should toggle is uploading status to true', function () {
            var action = new ValidateTransferRekey();
            var result = rekeyReasonReducer(initialState, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { uploadStatus: __assign(__assign({}, initialState.uploadStatus), { isUploading: true }) }));
        });
    });
    describe('[RekeyReasonPage] Validate transfer rekey failed', function () {
        it('should not set upload as failed when staff validation failed', function () {
            var action = new ValidateTransferRekeyFailed(true);
            var result = rekeyReasonReducer(initialState, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { uploadStatus: __assign(__assign({}, initialState.uploadStatus), { hasUploadFailed: false, hasStaffNumberFailedValidation: true }) }));
        });
        it('should set upload as failed when failed staff validation not set', function () {
            var action = new ValidateTransferRekeyFailed(false);
            var result = rekeyReasonReducer(initialState, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { uploadStatus: __assign(__assign({}, initialState.uploadStatus), { hasUploadFailed: true, hasStaffNumberFailedValidation: false }) }));
        });
    });
    describe('[RekeyReasonPage] Reset staff number validation error', function () {
        it('should reset staff validation failed', function () {
            var action = new ResetStaffNumberValidationError();
            var result = rekeyReasonReducer(initialState, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { uploadStatus: __assign(__assign({}, initialState.uploadStatus), { hasStaffNumberFailedValidation: false }) }));
        });
    });
});
//# sourceMappingURL=rekey-reason.reducer.spec.js.map