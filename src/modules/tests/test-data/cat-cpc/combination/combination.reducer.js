import * as combinationActionTypes from './combination.action';
var initialState = null;
export function combinationReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case combinationActionTypes.POPULATE_COMBINATION:
            return action.payload;
        default:
            return state;
    }
}
//# sourceMappingURL=combination.reducer.js.map