import { initialState, testStatusReducer } from '../test-status.reducer';
import { TestStatus } from '../test-status.model';
import {
  TestStatusStarted,
  TestStatusDecided,
  TestStatusCompleted,
  TestStatusSubmitted,
} from '../test-status.actions';

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

  it('should change the test to completed when receiving the TestStatusCompleted action', () => {
    const result = testStatusReducer(TestStatus.Decided, new TestStatusCompleted());
    expect(result).toBe(TestStatus.Completed);
  });

  it('should change the test to submitted when receiving the TestStatusSubmitted action', () => {
    const result = testStatusReducer(TestStatus.Submitted, new TestStatusSubmitted());
    expect(result).toBe(TestStatus.Submitted);
  });
});
