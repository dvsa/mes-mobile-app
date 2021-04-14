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
import * as pcvDoorExerciseActions from './pcv-door-exercise.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = {
    dangerousFault: null,
    seriousFault: null,
    drivingFault: null,
    dangerousFaultComments: null,
    seriousFaultComments: null,
    drivingFaultComments: null,
};
export function pcvDoorExerciseReducer(state, action) {
    var _a;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case pcvDoorExerciseActions.PCV_DOOR_EXERCISE_ADD_DRIVING_FAULT:
            return __assign(__assign({}, state), { drivingFault: true });
        case pcvDoorExerciseActions.PCV_DOOR_EXERCISE_ADD_SERIOUS_FAULT:
            return __assign(__assign({}, state), { seriousFault: true });
        case pcvDoorExerciseActions.PCV_DOOR_EXERCISE_ADD_DANGEROUS_FAULT:
            return __assign(__assign({}, state), { dangerousFault: true });
        case pcvDoorExerciseActions.PCV_DOOR_EXERCISE_REMOVE_DRIVING_FAULT:
            return __assign(__assign({}, state), { drivingFault: false });
        case pcvDoorExerciseActions.PCV_DOOR_EXERCISE_REMOVE_SERIOUS_FAULT:
            return __assign(__assign({}, state), { seriousFault: false });
        case pcvDoorExerciseActions.PCV_DOOR_EXERCISE_REMOVE_DANGEROUS_FAULT:
            return __assign(__assign({}, state), { dangerousFault: false });
        case pcvDoorExerciseActions.ADD_PCV_DOOR_EXERCISE_COMMENT:
            return __assign(__assign({}, state), (_a = {}, _a[action.fieldName] = action.comment, _a));
        default:
            return state;
    }
}
export var getPcvDoorExercise = createFeatureSelector('pcvDoorExercise');
//# sourceMappingURL=pcv-door-exercise.reducer.js.map