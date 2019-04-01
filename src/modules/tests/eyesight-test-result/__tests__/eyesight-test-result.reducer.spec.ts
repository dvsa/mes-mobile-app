import { eyesightTestResultReducer } from '../eyesight-test-result.reducer';
import {
  EyesightPassPressed,
  EyesightFailPressed,
  EyesightFailCancelled,
} from '../../../../pages/waiting-room-to-car/waiting-room-to-car.actions';

describe('eyesight test result reducer', () => {
  it('should add a pass to the state when pass is pressed', () => {
    const result = eyesightTestResultReducer(null, new EyesightPassPressed());
    expect(result).toBe('P');
  });

  it('should add fail to the state when fail is pressed', () => {
    const result = eyesightTestResultReducer(null, new EyesightFailPressed());
    expect(result).toBe('F');
  });

  it('should reset the eyesight test result when failure is cancelled', () => {
    const result = eyesightTestResultReducer('F', new EyesightFailCancelled());
    expect(result).toBeNull();
  });
});
