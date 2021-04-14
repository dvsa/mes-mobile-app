var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { createFeatureSelector } from '@ngrx/store';
import * as logsActions from './logs.actions';
export var initialState = [];
export function logsReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case logsActions.SAVE_LOG:
            return __spreadArray(__spreadArray([], state), [
                action.payload,
            ]);
        case logsActions.SEND_LOGS_SUCCESS:
            return state.filter(function (log) { return !action.timestamps.includes(log.timestamp); });
        case logsActions.LOAD_LOG_STATE:
            return __spreadArray(__spreadArray([], state), action.payload);
        default:
            return state;
    }
}
export var getLogsState = createFeatureSelector('logs');
//# sourceMappingURL=logs.reducer.js.map