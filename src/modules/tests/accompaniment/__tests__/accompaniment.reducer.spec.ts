import { accompanimentReducer } from '../accompaniment.reducer';
import {
  InstructorAccompanimentToggled,
  SupervisorAccompanimentToggled,
  OtherAccompanimentToggled,
} from '../accompaniment.actions';

describe('accompaniment reducer', () => {

  it('should toggle ADI accompaniment when receiving the instructor toggle action', () => {
    let result;
    result = accompanimentReducer({}, new InstructorAccompanimentToggled());
    expect(result.ADI).toBe(true);
    result = accompanimentReducer(result, new InstructorAccompanimentToggled());
    expect(result.ADI).toBe(false);
  });

  it('should toggle supervisor accompaniment when receiving the supervisor toggle action', () => {
    let result;
    result = accompanimentReducer({}, new SupervisorAccompanimentToggled());
    expect(result.supervisor).toBe(true);
    result = accompanimentReducer(result, new SupervisorAccompanimentToggled());
    expect(result.supervisor).toBe(false);
  });

  it('should toggle other accompaniment when receiving the other toggle action', () => {
    let result;
    result = accompanimentReducer({}, new OtherAccompanimentToggled());
    expect(result.other).toBe(true);
    result = accompanimentReducer(result, new OtherAccompanimentToggled());
    expect(result.other).toBe(false);
  });
});
