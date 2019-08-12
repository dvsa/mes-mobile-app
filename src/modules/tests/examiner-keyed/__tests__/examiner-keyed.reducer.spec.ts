import { examinerKeyedReducer } from '../examiner-keyed.reducer';
import { SetExaminerKeyed } from '../examiner-keyed.actions';

describe('examinerKeyedReducer', () => {
  it('should default to null ', () => {
    const result = examinerKeyedReducer(null, null);
    expect(result).toBe(null);
  });
  it('should return the correct value ', () => {
    const result = examinerKeyedReducer(null, new SetExaminerKeyed(123456));
    expect(result).toBe(123456);
  });
});
