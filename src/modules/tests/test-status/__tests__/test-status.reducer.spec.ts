import { initialState, testStatusReducer } from '../test-status.reducer';
import { TestStatus } from '../test-status.model';
import { TestStatusStarted } from '../test-status.actions';

describe('test status reducer', () => {
  it('should have the initial state of NotStarted', () => {
    expect(initialState).toBe(TestStatus.NotStarted);
  });

  it('should move the test to started when receiving the TestStatusStarted action', () => {
    const result = testStatusReducer(TestStatus.NotStarted, new TestStatusStarted());
    expect(result).toBe(TestStatus.Started);
  });
});
