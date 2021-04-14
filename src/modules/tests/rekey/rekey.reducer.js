import * as rekeyActions from '../rekey/rekey.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = false;
export var rekeyReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case rekeyActions.MARK_AS_REKEY:
            return true;
        case rekeyActions.MARK_AS_NON_REKEY:
            return false;
        default:
            return state;
    }
};
export var getRekeyIndicator = createFeatureSelector('rekey');
//# sourceMappingURL=rekey.reducer.js.map