import { eyesightTestResultReducer } from '../eyesight-test-result.reducer';
import { EyesightResultPasssed, EyesightResultFailed, EyesightResultReset } from '../eyesight-test-result.actions';

describe('eyesight test result reducer', () => {
  it('should add a pass to the state when pass is pressed', () => {
    const result = eyesightTestResultReducer(null, new EyesightResultPasssed());
    expect(result).toBe('P');
  });

  it('should add fail to the state when fail is pressed', () => {
    const result = eyesightTestResultReducer(null, new EyesightResultFailed());
    expect(result).toBe('F');
  });

  it('should reset the eyesight test result when failure is cancelled', () => {
    const result = eyesightTestResultReducer('F', new EyesightResultReset());
    expect(result).toBeNull();
  });
});
