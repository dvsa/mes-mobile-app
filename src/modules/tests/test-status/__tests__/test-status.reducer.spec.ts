import { initialState, testStatusReducer } from '../test-status.reducer';
import { TestStatus } from '../test-status.model';
import { TestStatusStarted, TestStatusDecided } from '../test-status.actions';

describe('test status reducer', () => {
  it('should have the initial state of NotStarted', () => {
    expect(initialState).toBe(TestStatus.Booked);
  });

  it('should move the test to started when receiving the TestStatusStarted action', () => {
    const result = testStatusReducer(TestStatus.Booked, new TestStatusStarted());
    expect(result).toBe(TestStatus.Started);
  });

  it('should change the test to decided when receiving the TestStatusDecided action', () => {
    const result = testStatusReducer(TestStatus.Started, new TestStatusDecided());
    expect(result).toBe(TestStatus.Decided);
  });
});
