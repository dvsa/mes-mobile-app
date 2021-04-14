import * as totalPercentageActionTypes from './total-percentage.action';
var initialState = 0;
export function totalPercentageReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case totalPercentageActionTypes.POPULATE_TOTAL_PERCENTAGE:
            return action.payload;
        default:
            return state;
    }
}
//# sourceMappingURL=total-percentage.reducer.js.map