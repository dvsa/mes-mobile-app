import { instructorDetailsReducer } from '../instructor-details.reducer';
import {
  InstructorRegistrationNumberChanged,
  InstructorRegistrationNumberRemoved,
} from '../instructor-details.actions';

describe('instructor details reducer', () => {
  it('should place the registration number from the change action into the state', () => {
    const result = instructorDetailsReducer({}, new InstructorRegistrationNumberChanged(123));
    expect(result.registrationNumber).toBe(123);
  });

  it('should should set registrationNumber as undefined when action is fired', () => {
    const result = instructorDetailsReducer({}, new InstructorRegistrationNumberChanged(123));
    expect(result.registrationNumber).toBe(123);

    const res = instructorDetailsReducer({}, new InstructorRegistrationNumberRemoved());
    expect(res.registrationNumber).toBe(undefined);
  });
});
