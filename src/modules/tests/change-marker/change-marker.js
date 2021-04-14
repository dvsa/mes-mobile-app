import * as changeMarkerActions from './change-marker.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = false;
export var changeMarkerReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case changeMarkerActions.SET_CHANGE_MARKER:
            return action.changeMarker;
        default:
            return state;
    }
};
export var getChangeMarker = createFeatureSelector('changeMarker');
//# sourceMappingURL=change-marker.js.map