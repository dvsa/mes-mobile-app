import { examinerConductedReducer } from '../examiner-conducted.reducer';
import { SetExaminerConducted } from '../examiner-conducted.actions';

describe('examinerConductedReducer', () => {
  it('should default to null ', () => {
    const result = examinerConductedReducer(null, null);
    expect(result).toBe(null);
  });
  it('should return the correct value ', () => {
    const result = examinerConductedReducer(null, new SetExaminerConducted(123456));
    expect(result).toBe(123456);
  });
});
