import { examinerBookedReducer } from '../examiner-booked.reducer';
import { SetExaminerBooked } from '../examiner-booked.actions';

describe('examinerBookedReducer', () => {
  it('should default to null ', () => {
    const result = examinerBookedReducer(null, null);
    expect(result).toBe(null);
  });
  it('should return the correct value ', () => {
    const result = examinerBookedReducer(null, new SetExaminerBooked(123456));
    expect(result).toBe(123456);
  });
});
