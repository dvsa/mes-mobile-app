import { createFeatureSelector } from '@ngrx/store';
import * as examinerActions from './examiner.actions';
export var initialState = {
    staffNumber: null,
};
export function examinerReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case examinerActions.POPULATE_EXAMINER:
            return action.payload;
    }
    return state;
}
export var getExaminer = createFeatureSelector('examiner');
//# sourceMappingURL=examiner.reducer.js.map