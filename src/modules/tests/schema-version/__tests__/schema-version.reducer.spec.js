import { schemaVersionReducer } from '../schema-version.reducer';
import { PopulateTestSchemaVersion } from '../schema-version.actions';
describe('schema version reducer', function () {
    it('should return the test schema version for a test', function () {
        var mockTestSchemaVersion = '0.0.1';
        var result = schemaVersionReducer(null, new PopulateTestSchemaVersion(mockTestSchemaVersion));
        expect(result).toBe(mockTestSchemaVersion);
    });
});
//# sourceMappingURL=schema-version.reducer.spec.js.map