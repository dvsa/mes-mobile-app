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
import { createFeatureSelector } from '@ngrx/store';
import * as testSlotAttributesActions from './test-slot-attributes.actions';
export var initialState = {
    welshTest: null,
    slotId: null,
    start: '',
    vehicleTypeCode: '',
    extendedTest: false,
    specialNeeds: false,
};
export function testSlotsAttributesReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case testSlotAttributesActions.POPULATE_TEST_SLOT_ATTRIBUTES:
            return action.payload;
        case testSlotAttributesActions.SET_START_TIME:
            return __assign(__assign({}, state), { start: action.payload });
        default:
            return state;
    }
}
export var getTestSlotAttributes = createFeatureSelector('testSlotAttributes');
//# sourceMappingURL=test-slot-attributes.reducer.js.map