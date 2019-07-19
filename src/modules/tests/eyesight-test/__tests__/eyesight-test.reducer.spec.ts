import { eyesightTestReducer } from '../eyesight-test.reducer';
import { EyesightResultPasssed, EyesightResultFailed, EyesightResultReset } from '../eyesight-test.actions';

describe('eyesight test reducer', () => {
  it('should add a pass to the state when pass is pressed', () => {
    const result = eyesightTestReducer(true, new EyesightResultPasssed());
    expect(result).toBe(true);
  });

  it('should add fail to the state when fail is pressed', () => {
    const result = eyesightTestReducer(true, new EyesightResultFailed());
    expect(result).toBe(true);
  });

  it('should reset the eyesight test result when failure is cancelled', () => {
    const result = eyesightTestReducer(false, new EyesightResultReset());
    expect(result).toBe(false);
  });
});
