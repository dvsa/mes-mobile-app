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
import * as vehicleDetailsActions from '../common/vehicle-details.actions';
import { createFeatureSelector } from '@ngrx/store';
var initialState = {
    registrationNumber: '',
};
export var vehicleDetailsCatAMod1Reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case vehicleDetailsActions.VEHICLE_REGISTRATION_CHANGED:
            return __assign(__assign({}, state), { registrationNumber: action.vehicleRegistration });
        case vehicleDetailsActions.GEARBOX_CATEGORY_CHANGED:
            return __assign(__assign({}, state), { gearboxCategory: action.gearboxCategory });
        case vehicleDetailsActions.CLEAR_GEARBOX_CATEGORY:
            return __assign(__assign({}, state), { gearboxCategory: null });
        case vehicleDetailsActions.SCHOOL_BIKE_TOGGLED:
            return __assign(__assign({}, state), { schoolBike: !state.schoolBike });
        default:
            return state;
    }
};
export var getVehicleDetails = createFeatureSelector('vehicleDetails');
//# sourceMappingURL=vehicle-details.cat-a-mod1.reducer.js.map