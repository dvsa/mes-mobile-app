import { rekeyDateReducer } from '../rekey-date.reducer';
import { SetRekeyDate } from '../rekey-date.actions';
describe('rekeyDateReducer', function () {
    it('should return a date', function () {
        var result = rekeyDateReducer(null, new SetRekeyDate());
        expect(result).not.toBeNull();
    });
});
//# sourceMappingURL=rekey.reducer.spec.js.map