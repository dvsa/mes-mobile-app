import { eyesightTestResultReducer } from '../eyesight-test-result.reducer';
import {
  EyesightPassPressed,
  EyesightFailConfirmed,
  EyesightFailPressed,
} from '../../../../pages/waiting-room-to-car/waiting-room-to-car.actions';

describe('eyesight test result reducer', () => {
  it('should add a pass to the state when pass is pressed', () => {
    const result = eyesightTestResultReducer(null, new EyesightPassPressed());
    expect(result).toBe('P');
  });

  it('should add fail to the state when fail is confirmed', () => {
    const result = eyesightTestResultReducer(null, new EyesightFailConfirmed());
    expect(result).toBe('F');
  });

  it('should clear the eyesight test state when fail is pressed but not yet confirmed', () => {
    const result = eyesightTestResultReducer('P', new EyesightFailPressed());
    expect(result).toBeNull();
  });
});
