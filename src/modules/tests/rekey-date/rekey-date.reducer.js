import * as rekeyDateActions from './rekey-date.actions';
import { createFeatureSelector } from '@ngrx/store';
import { DateTime } from '../../../shared/helpers/date-time';
export var initialState = null;
export var rekeyDateReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case rekeyDateActions.SET_REKEY_DATE:
            return state ? state : new DateTime().format('YYYY-MM-DDTHH:mm:ss');
        default:
            return state;
    }
};
export var getRekeyDate = createFeatureSelector('rekeyDate');
//# sourceMappingURL=rekey-date.reducer.js.map