import { activityCodeReducer } from '../activity-code.reducer';
import { SetActivityCode } from '../activity-code.actions';
describe('activityCodeReducer', function () {
    describe('SET_ACTIVITY_CODE', function () {
        it('should set the correct activity code', function () {
            var result = activityCodeReducer(null, new SetActivityCode('1'));
            expect(result).toEqual('1');
        });
    });
});
//# sourceMappingURL=activity-code.reducer.spec.js.map