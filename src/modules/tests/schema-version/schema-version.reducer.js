import * as schemaVersionActions from './schema-version.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = '';
export var schemaVersionReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case schemaVersionActions.POPULATE_TEST_SCHEMA_VERSION:
            return action.payload;
        default:
            return state;
    }
};
export var getTestSchemaVersion = createFeatureSelector('schemaVersion');
//# sourceMappingURL=schema-version.reducer.js.map