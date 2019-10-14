import { activityCodeReducer } from '../activity-code.reducer';
import { SetActivityCode } from '../activity-code.actions';

describe('activityCodeReducer', () => {
  describe('SET_ACTIVITY_CODE', () => {
    it('should set the correct activity code', () => {
      const result = activityCodeReducer(null , new SetActivityCode('1'));
      expect(result).toEqual('1');
    });
  });
});
