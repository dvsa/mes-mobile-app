import { rekeyReducer } from '../rekey.reducer';
import { MarkAsRekey } from '../rekey.actions';
describe('rekeyReducer', function () {
    it('should return true if MarkAsRekey action passed', function () {
        var result = rekeyReducer(null, new MarkAsRekey());
        expect(result).toBe(true);
    });
});
//# sourceMappingURL=rekey.reducer.spec.js.map