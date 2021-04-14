import { createFeatureSelector } from '@ngrx/store';
import * as activityCodeActions from './activity-code.actions';
export var initialState = null;
export function activityCodeReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case activityCodeActions.SET_ACTIVITY_CODE:
            return action.payload;
        default:
            return state;
    }
}
export var getActivityCode = createFeatureSelector('activityCode');
//# sourceMappingURL=activity-code.reducer.js.map