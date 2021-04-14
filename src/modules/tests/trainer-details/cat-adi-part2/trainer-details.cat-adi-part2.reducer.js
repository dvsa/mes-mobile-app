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
import * as trainerDetailActions from './trainer-details.cat-adi-part2.actions';
import { createFeatureSelector } from '@ngrx/store';
var initialState = {
    orditTrainedCandidate: null,
    trainingRecords: null,
    trainerRegistrationNumber: null,
};
export var trainerDetailsCatADIPart2Reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case trainerDetailActions.ORDIT_CHANGED:
            return __assign(__assign({}, state), { orditTrainedCandidate: action.orditChanged });
        case trainerDetailActions.TRAINING_RECORDS_CHANGED:
            return __assign(__assign({}, state), { trainingRecords: action.trainingRecordChanged });
        case trainerDetailActions.TRAINER_REGISTRATION_NUMBER_CHANGED:
            return __assign(__assign({}, state), { trainerRegistrationNumber: action.trainerRegistrationNumber });
        default:
            return state;
    }
};
export var getTrainerDetails = createFeatureSelector('trainerDetails');
//# sourceMappingURL=trainer-details.cat-adi-part2.reducer.js.map