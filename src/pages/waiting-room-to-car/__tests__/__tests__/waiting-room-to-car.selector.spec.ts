import { EyesightRadioState, WaitingRoomToCarModel } from '../../waiting-room-to-car.reducer';
import {
  getEyesightRadioState,
  isEyesightFailRadioSelected,
  isEyesightPassRadioSelected,
} from '../../waiting-room-to-car.selector';

describe('waiting room to car selector', () => {
  let state: WaitingRoomToCarModel;

  beforeEach(() => {
    state = {
      eyesightRadioState: EyesightRadioState.PassSelected,
    };
  });

  describe('getEyesightRadioState', () => {
    it('should extract the eyesight radio state from the Waiting Room To Car state', () => {
      const result = getEyesightRadioState(state);
      expect(result).toBe(EyesightRadioState.PassSelected);
    });
  });

  describe('isEyesightPassRadioSelected', () => {
    it('should return true where the eyesight radio state is PassSelected', () => {
      const result = isEyesightPassRadioSelected(EyesightRadioState.PassSelected);
      expect(result).toBe(true);
    });
    it('should return false where eyesight radio state is not PassSelected', () => {
      let result = isEyesightPassRadioSelected(EyesightRadioState.FailSelected);
      expect(result).toBe(false);
      result = isEyesightPassRadioSelected(EyesightRadioState.Unselected);
      expect(result).toBe(false);
    });
  });

  describe('isEyesightFailRadioSelected', () => {
    it('should return true where the eyesight radio state is FailSelected', () => {
      const result = isEyesightFailRadioSelected(EyesightRadioState.FailSelected);
      expect(result).toBe(true);
    });
    it('should return false where eyesight radio state is not FailSelected', () => {
      let result = isEyesightFailRadioSelected(EyesightRadioState.PassSelected);
      expect(result).toBe(false);
      result = isEyesightFailRadioSelected(EyesightRadioState.Unselected);
      expect(result).toBe(false);
    });
  });
});
